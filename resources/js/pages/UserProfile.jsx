// UserProfile.jsx
import React, { useState } from "react";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  Edit,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Link, useForm, usePage } from "@inertiajs/react";

const UserProfile = ({ totalOrder, ordersData, userData }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { auth } = usePage().props;

  const { post, processing } = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    post(route("customer.logout"));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] overflow-hidden mb-8">
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img
                src={userData.image || "https://media.istockphoto.com/id/2156807988/vector/simple-gray-avatar-icons-representing-male-and-female-profiles-vector-minimalist-design-with.jpg?s=612x612&w=0&k=20&c=xi7g5_9VBSWgntTZ-OQNS74d0oOvUnDGxjxUL_LdJUM="}
                alt={userData.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-[var(--color-red)] text-white p-2 rounded-full shadow">
                <Edit size={16} />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="text-gray-600 mt-1">{userData.email}</p>
              <p className="text-sm text-gray-500 mt-1">{userData.phone}</p>
              {/* <p className="text-sm text-gray-500 mt-2">{userData.joinDate}</p> */}
            </div>

            <div className="sm:ml-auto mt-4 sm:mt-0">
              <button 
                onClick={handleLogout}
                disabled={processing}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-red)] text-white rounded-lg hover:bg-red-800 transition shadow-sm disabled:opacity-50"
              >
                {processing ? <Loader2 className="animate-spin" size={18} /> : <LogOut size={18} />}
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] overflow-hidden">
          {/* Mobile Tabs */}
          <div className="lg:hidden border-b border-[var(--color-gray)]">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 whitespace-nowrap font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-[var(--color-red)] border-b-2 border-[var(--color-red)]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-[500px]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 border-r border-[var(--color-gray)] bg-gray-50 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? "bg-white text-[var(--color-red)] shadow-sm font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 sm:p-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Account Overview
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-[var(--color-gray)]">
                      <div className="text-sm text-gray-500">Total Orders</div>
                      <div className="text-3xl font-bold text-[var(--color-red)] mt-1">
                        {totalOrder}
                      </div>
                    </div>
                    {/* Placeholder for other stats */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-[var(--color-gray)]">
                      <div className="text-sm text-gray-500">
                        Wishlist Items
                      </div>
                      <div className="text-3xl font-bold text-[var(--color-red)] mt-1">
                        0
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {ordersData?.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="flex justify-between items-center p-4 bg-white border border-[var(--color-gray)] rounded-lg hover:border-[var(--color-red)] transition"
                        >
                          <div>
                            <p className="font-medium">#{order.invoice_id}</p>
                            <p className="text-sm text-gray-500">
                              {/* Order Date could be added to query if available */}
                              {order.payment_method}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {order.currency_icon}{order.amount}
                            </p>
                            <p className="text-sm text-green-600">
                              {order.order_status?.name}
                            </p>
                          </div>
                        </div>
                      ))}
                      {(!ordersData || ordersData.length === 0) && (
                        <p className="text-gray-500 italic">No orders found.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    My Orders
                  </h2>
                  <div className="space-y-5">
                    {ordersData?.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 border border-[var(--color-gray)] rounded-lg hover:border-[var(--color-red)] transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">#{order.invoice_id}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Payment: {order.payment_method}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {order.order_status?.name}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-lg font-semibold text-[var(--color-red)]">
                            {order.currency_icon}{order.amount}
                          </span>
                          <button className="text-[var(--color-red)] hover:underline text-sm font-medium flex items-center gap-1">
                            View Details <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!ordersData || ordersData.length === 0) && (
                      <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    My Addresses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.address ? (
                      <div className="p-6 border border-[var(--color-gray)] rounded-xl hover:border-[var(--color-red)] transition">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">
                            Default Address
                          </h3>
                        </div>
                        <p className="mt-3 text-gray-700 whitespace-pre-line">
                          {userData.name}
                          <br />
                          {userData.address}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {userData.phone}
                        </p>
                      </div>
                    ) : (
                       <p className="text-gray-500 italic">No address provided.</p>
                    )}

                    <div className="p-6 border border-dashed border-[var(--color-gray)] rounded-xl hover:border-[var(--color-red)] transition text-center flex flex-col items-center justify-center min-h-[180px]">
                      <button className="text-[var(--color-red)] hover:text-red-800 font-medium">
                        + Add New Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={userData.name}
                            className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-3 border border-[var(--color-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] outline-none"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Update Information
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">Go to edit profile to change your details.</p>
                       <Link 
                        href="#" 
                        className="bg-[var(--color-red)] text-white px-6 py-2 rounded-lg font-medium hover:bg-red-800 transition"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
