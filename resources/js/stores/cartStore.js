import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { route } from 'ziggy-js';

const debouncedSync = debounce(() => {
    useCartStore.getState().syncCart();
}, 700);

// Cancel any pending sync on page unload to avoid race
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        debouncedSync.cancel();
    });
}

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            total: 0,
            cartCount: 0,

            // Recalculate: ensures quantity is number, and cartCount is unique items count
            recalculate: (items) => {
                const total = items.reduce((sum, i) => {
                    const quantity = Number(i.quantity) || 1; // Force number
                    const basePrice = parseFloat(i.price || 0);
                    const variantTotal = parseFloat(i.options?.variant_total || 0);
                    const extraPrice = parseFloat(i.options?.extra_price || 0);

                    const itemTotalPrice = basePrice + variantTotal + extraPrice;
                    return sum + itemTotalPrice * quantity;
                }, 0);

                const count = items.length; // unique items count

                return {
                    cartItems: items,
                    total: Number(total.toFixed(2)),
                    cartCount: count,
                };
            },

            setCart: (items) => {
                // Normalize quantities to numbers when setting from server
                const normalizedItems = Array.isArray(items) 
                    ? items.map(item => ({
                        ...item,
                        quantity: Number(item.quantity) || 1,
                    }))
                    : [];
                const state = get().recalculate(normalizedItems);
                set(state);
            },

            increment: (cartId, availableStock) => {
                set((state) => {
                    const items = state.cartItems.map((item) => {
                        if (item.id === cartId) {
                            const currentQty = Number(item.quantity) || 1;
                            const newQty = currentQty + 1;
                            if (newQty > availableStock) return item;
                            return { ...item, quantity: newQty };
                        }
                        return item;
                    });

                    return get().recalculate(items);
                });

                debouncedSync(); 
            },

            decrement: (cartId) => {
                set((state) => {
                    const items = state.cartItems
                        .map((item) => {
                            if (item.id === cartId) {
                                const currentQty = Number(item.quantity) || 1;
                                if (currentQty <= 1) return null; // will be filtered
                                return { ...item, quantity: currentQty - 1 };
                            }
                            return item;
                        })
                        .filter(Boolean); // remove nulls

                    return get().recalculate(items);
                });

                debouncedSync();
            },

            remove: (cartId) => {
                set((state) => {
                    const items = state.cartItems.filter((item) => item.id !== cartId);
                    return get().recalculate(items);
                });

                // Fire and forget delete
                axios.delete(route('cart.remove', cartId)).catch(console.error);
            },

            clearCart: () => {
                set({
                    cartItems: [],
                    total: 0,
                    cartCount: 0,
                });

                axios.post(route('cart.clear')).catch(console.error);
            },

            syncCart: async () => {
                const items = get().cartItems;

                // Prevent sending empty or invalid data
                if (!items || items.length === 0) return;

                try {
                    await axios.post(route('cart.sync'), {
                        items: items.map((i) => ({
                            id: i.id,
                            quantity: Number(i.quantity), // Always send as number
                        })),
                    });
                } catch (e) {
                    console.error('Cart sync failed', e);
                }
            },
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                cartItems: state.cartItems.map(item => ({
                    ...item,
                    quantity: Number(item.quantity), // Ensure saved as number
                })),
                total: state.total,
                cartCount: state.cartCount,
            }),
            // Customize how state is restored
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Normalize quantities when rehydrating from localStorage
                    state.cartItems = Array.isArray(state.cartItems) 
                        ? state.cartItems.map(item => ({
                            ...item,
                            quantity: Number(item.quantity) || 1,
                        }))
                        : [];
                    // Recalculate after rehydration
                    const storeState = useCartStore.getState();
                    const recalculated = storeState.recalculate(state.cartItems);
                    useCartStore.setState(recalculated);
                }
            },
        }
    )
);

export default useCartStore;
