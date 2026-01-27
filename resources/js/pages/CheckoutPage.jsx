// CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Smartphone, DollarSign, Package } from 'lucide-react';
import { useForm, Link, Head, usePage } from '@inertiajs/react';
import useCartStore from '../stores/cartStore';

const CheckoutPage = ({ shipping_methods, pickup_methods, countries, customer_addresses }) => {
    const { settings } = usePage().props;
    const { cartItems, total } = useCartStore(); 
    const subtotal = Number(total) || 0;

    const { data, setData, post, processing, errors, transform } = useForm({
        // UI Fields
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        street_address: '',
        city: '',
        zip_code: '',
        country: 'Denmark',
        
        // Selection
        shipping_method_id: '',
        payment_method: 'paypal', // default
        
        // Internal storage for full objects required by backend
        shipping_method_obj: null,
    });

    const [selectedShippingCost, setSelectedShippingCost] = useState(0);

    // Transform data before submit to match PaymentController expectations
    transform((data) => ({
        payment_method: data.payment_method,
        shipping_method: data.shipping_method_obj, // backend expects array/object for shipping_method
        shipping_address: {
            address: data.street_address,
            city: data.city,
            zip_code: data.zip_code,
            country: data.country
        },
        personal_info: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone
        }
    }));

    const handleShippingChange = (method) => {
        setSelectedShippingCost(Number(method.cost));
        setData(data => ({
            ...data,
            shipping_method_id: method.id,
            shipping_method_obj: method
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const finalTotal = subtotal + selectedShippingCost;

    return (
        <div className="min-h-screen bg-gray py-8 px-4 sm:px-6 lg:px-8">
            <Head title="Checkout" />
            <div className="container">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={route('cart.index')}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-red)] transition mb-4"
                    >
                        <ArrowLeft size={18} />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
                    {/* Left - Forms */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Contact & Shipping */}
                        <section className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] p-6 sm:p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <Truck size={22} className="text-[var(--color-red)]" />
                                Shipping Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                        placeholder="John"
                                    />
                                    {errors['personal_info.first_name'] && <p className="text-red-500 text-xs mt-1">{errors['personal_info.first_name']}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                        placeholder="Doe"
                                    />
                                    {errors['personal_info.last_name'] && <p className="text-red-500 text-xs mt-1">{errors['personal_info.last_name']}</p>}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                    placeholder="your@email.com"
                                />
                                {errors['personal_info.email'] && <p className="text-red-500 text-xs mt-1">{errors['personal_info.email']}</p>}
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                    placeholder="+45 12 34 56 78"
                                />
                                {errors['personal_info.phone'] && <p className="text-red-500 text-xs mt-1">{errors['personal_info.phone']}</p>}
                            </div>

                            <div className="mt-8 border-t border-[var(--color-gray)] pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            value={data.street_address}
                                            onChange={e => setData('street_address', e.target.value)}
                                            className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                            placeholder="123 Main Street"
                                        />
                                        {errors['shipping_address.address'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_address.address']}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                value={data.city}
                                                onChange={e => setData('city', e.target.value)}
                                                className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                                placeholder="Copenhagen"
                                            />
                                            {errors['shipping_address.city'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_address.city']}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ZIP / Postal
                                            </label>
                                            <input
                                                type="text"
                                                value={data.zip_code}
                                                onChange={e => setData('zip_code', e.target.value)}
                                                className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition"
                                                placeholder="1050"
                                            />
                                            {errors['shipping_address.zip_code'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_address.zip_code']}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <select
                                            value={data.country}
                                            onChange={e => setData('country', e.target.value)}
                                            className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none transition bg-white"
                                        >
                                            {countries && Object.entries(countries).length > 0 ? (
                                                Object.entries(countries).map(([code, name]) => (
                                                    <option key={code} value={name}>{name}</option>
                                                ))
                                            ) : (
                                                 <option value="Denmark">Denmark</option>
                                            )}
                                        </select>
                                        {errors['shipping_address.country'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_address.country']}</p>}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Shipping Methods */}
                            <div className="mt-8 border-t border-[var(--color-gray)] pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
                                <div className="space-y-3">
                                    {shipping_methods.map((method) => (
                                        <label key={method.id} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${data.shipping_method_id === method.id ? 'border-[var(--color-red)] bg-red-50' : 'border-[var(--color-gray)] hover:border-[var(--color-red)]'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping_method"
                                                    value={method.id}
                                                    checked={data.shipping_method_id === method.id}
                                                    onChange={() => handleShippingChange(method)}
                                                    className="text-[var(--color-red)] focus:ring-[var(--color-red)]"
                                                />
                                                <span className="font-medium text-gray-900">{method.name}</span>
                                            </div>
                                            <span className="font-medium text-gray-900">{settings?.currency_icon || '€'}{Number(method.cost).toFixed(2)}</span>
                                        </label>
                                    ))}
                                    {errors.shipping_method && <p className="text-red-500 text-xs mt-1">{errors.shipping_method}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] p-6 sm:p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <CreditCard size={22} className="text-[var(--color-red)]" />
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${data.payment_method === 'paypal' ? 'border-[var(--color-red)] bg-red-50' : 'border-[var(--color-gray)] hover:border-[var(--color-red)]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="paypal"
                                        checked={data.payment_method === 'paypal'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-5 h-5 text-[var(--color-red)] focus:ring-[var(--color-red)]"
                                    />
                                    <div>
                                        <div className="font-medium">PayPal</div>
                                        <div className="text-sm text-gray-500">Pay securely with PayPal</div>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${data.payment_method === 'mobilePay' ? 'border-[var(--color-red)] bg-red-50' : 'border-[var(--color-gray)] hover:border-[var(--color-red)]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="mobilePay"
                                        checked={data.payment_method === 'mobilePay'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-5 h-5 text-[var(--color-red)] focus:ring-[var(--color-red)]"
                                    />
                                    <div>
                                        <div className="font-medium">MobilePay</div>
                                        <div className="text-sm text-gray-500">Pay instantly via app</div>
                                    </div>
                                </label>
                                
                                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${data.payment_method === 'payoneer' ? 'border-[var(--color-red)] bg-red-50' : 'border-[var(--color-gray)] hover:border-[var(--color-red)]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="payoneer"
                                        checked={data.payment_method === 'payoneer'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-5 h-5 text-[var(--color-red)] focus:ring-[var(--color-red)]"
                                    />
                                    <div>
                                        <div className="font-medium">Payoneer</div>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${data.payment_method === 'cashOnDelivery' ? 'border-[var(--color-red)] bg-red-50' : 'border-[var(--color-gray)] hover:border-[var(--color-red)]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cashOnDelivery"
                                        checked={data.payment_method === 'cashOnDelivery'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-5 h-5 text-[var(--color-red)] focus:ring-[var(--color-red)]"
                                    />
                                    <div>
                                        <div className="font-medium">Cash On Delivery</div>
                                        <div className="text-sm text-gray-500">Pay when you receive the order</div>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right - Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] p-6 sm:p-8 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-5 mb-8">
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-center">Your cart is empty.</p>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-[var(--color-gray)]">
                                                <img
                                                    src={item.image || item.options?.image || '/placeholder.png'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                                <p className="text-sm text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                                                <p className="text-sm font-medium text-[var(--color-red)] mt-1">
                                                    {settings?.currency_icon || '€'}{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="space-y-4 border-t border-[var(--color-gray)] pt-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{settings?.currency_icon || '€'}{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className={selectedShippingCost === 0 ? "text-green-600 font-medium" : ""}>
                                        {selectedShippingCost === 0 ? 'FREE' : `${settings?.currency_icon || '€'}${selectedShippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-[var(--color-gray)] pt-4">
                                    <span>Total</span>
                                    <span>{settings?.currency_icon || '€'}{finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || cartItems.length === 0}
                                className={`w-full mt-8 bg-[var(--color-red)] text-white py-4 rounded-lg font-medium text-lg hover:bg-red-800 transition duration-200 shadow-md flex items-center justify-center gap-2 ${processing || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <CheckCircle size={20} />
                                {processing ? 'Processing...' : 'Place Order'}
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                Secure payment • 30-day returns • Encrypted checkout
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;