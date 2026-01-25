// CartPage.jsx
// CartPage.jsx
import React, { useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useCartStore } from "../stores/cartStore";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart_items, total: serverTotal, settings, promotions = [] } = usePage().props;
  const { cartItems, total, setCart, increment, decrement, remove } = useCartStore();

  // Initialize cart store with server data
  useEffect(() => {
    setCart(cart_items ?? [], serverTotal ?? 0);
  }, [cart_items, serverTotal]);

  // Increment quantity
  const handlePlus = (id, currentQty, availableStock) => {
    if (currentQty >= availableStock) {
      toast.warn(`Only ${availableStock} item(s) available`);
      return;
    }
    increment(id, availableStock);
  };

  // Decrement quantity
  const handleMinus = (id, currentQty) => {
    if (currentQty <= 1) return;
    decrement(id);
  };

  // Remove item
  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this item?')) {
      remove(id);
      toast.success("Product removed from cart");
    }
  };

  const subtotal = total || 0;
  const shipping = subtotal > 100 ? 0 : 12.90;
  const finalTotal = Number(subtotal) + Number(shipping);

  return (
    <div className="min-h-screen bg-gray py-8 px-4 sm:px-6 lg:px-8">
      <div className="container">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag size={32} className="text-red" />
            Your Cart
          </h1>
          <span className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 border-b border-[var(--color-gray)] last:border-b-0"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.options?.image ? `/${item.options.image}` : item.image}
                        alt={item.name || item.product?.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                          <h3 className="font-medium text-gray-900 text-lg">
                            {item.product?.name || item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{item.options?.size_name || item.variant}</p>
                          <p className="text-lg font-semibold text-[var(--color-red)] mt-2">
                            {settings?.currency_icon || '€'}{item.price}
                          </p>
                        </div>

                        {/* Mobile remove */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="sm:hidden text-red-600 hover:text-red-800 self-start"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity & Remove (desktop) */}
                      <div className="mt-4 flex items-center justify-between sm:justify-start gap-6">
                        <div className="flex items-center border border-[var(--color-gray)] rounded-md overflow-hidden">
                          <button
                            onClick={() => handleMinus(item.id, item.quantity)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handlePlus(item.id, item.quantity, item.product?.qty || 100)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-red transition"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={route('all.products')}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red transition"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{settings?.currency_icon || '€'}{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `${settings?.currency_icon || '€'}${shipping}`}</span>
                  </div>
                  <div className="border-t border-[var(--color-gray)] pt-4 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{settings?.currency_icon || '€'}{finalTotal}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Including VAT & shipping
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => router.get(route('checkout'))}
                  className="w-full mt-8 bg-red text-white py-4 rounded-lg font-medium hover:bg-red-800 transition duration-200 shadow-md"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Secure checkout • Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyCart = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray p-12 text-center">
    <ShoppingBag size={64} className="mx-auto text-gray mb-6" />
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Looks like you haven't added anything yet. Let's change that!
    </p>
    <a
      href={route('all.products')}
      className="inline-block bg-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-800 transition"
    >
      Start Shopping
    </a>
  </div>
);

export default CartPage;