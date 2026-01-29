import React from "react";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { usePage } from "@inertiajs/react";

const ContactPage = () => {
    const { props } = usePage();
    const { settings } = props;
    const address = settings.contact_address;
    const phone = settings.contact_phone;
    const email = settings.contact_email;
    return (
        <>
            <div className="relative min-h-screen bg-gray-50    pt-25 pb-20 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4 ">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We’d love to hear from you! Whether you have a
                            question about our education expo or need assistance
                            with your study abroad journey, we’re here to help.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left - Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white flex gap-4 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                    <MapPin size={28} className="text-red" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-black/70">
                                        Visit Us
                                    </h3>
                                    <p className="text-gray-600">{address}</p>
                                </div>
                            </div>

                            <div className="bg-white flex gap-4 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                    <Phone size={28} className="text-red" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-black/70">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-600">{phone}</p>
                                </div>
                            </div>

                            <div className="bg-white flex gap-4 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                    <Mail size={28} className="text-red" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-black/70">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Contact Form */}
                        <div className="lg:col-span-2">
                            <form className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                </div>
                                    

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                        placeholder="+880 1XXXXXXXXX"
                                    />
                                </div>
                                <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                            placeholder="subject"
                                            required
                                        />
                                    </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red transition"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-10 py-4 bg-red text-white font-semibold rounded-lg  transition flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
