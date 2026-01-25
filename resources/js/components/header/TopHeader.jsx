 
import React from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";

const TopHeader = () => {
  const { auth, cart } = usePage().props;

  return (
    <header className="bg-[#A60A07] text-white sticky top-0 z-50 shadow-md">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand Name */}
          <div className="shrink-0">
            <Link href="/">
              <h1 className="text-md md:text-3xl font-bold tracking-tight font-pop">
                DANISH SOUVENIRS
              </h1>
            </Link>
          </div>

          {/* Search Bar - center on desktop, full width on mobile */}
          <div className="hidden md:block flex-1 max-w-xl mx-4 md:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search product"
                className="
                  w-full
                  bg-white
                  text-gray-800 
                  placeholder:text-gray-400
                  pl-10 pr-12
                  py-2.5 md:py-3
                  rounded-full
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-white/30
                  transition-all duration-200 font-pop
                "
              />
              <button
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  p-2 rounded-full
                  bg-[#A60A07]
                  cursor-pointer
                  transition-colors
                "
                aria-label="Search"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Icons - right side */}
          <div className="flex items-center gap-4 md:gap-4">
            {auth?.user ? (
               <Link
                href="/user-profile"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="User account"
              >
                <FaUser size={24} />
                <span className="hidden sm:inline font-medium text-sm font-pop uppercase tracking-wider">{auth.user.name}</span>
              </Link>
            ) : (
              <Link
                href="/customer/login"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Login"
              >
                <FaUser size={24} />
                <span className="hidden sm:inline font-medium text-sm font-pop uppercase tracking-wider">Login</span>
              </Link>
            )}

            <Link
              href="/cart"
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Shopping cart"
            >
              <IoCart size={32} />
              {cart?.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#A60A07] text-xs font-bold rounded-full px-1.5 min-w-[1.2rem] h-5 flex items-center justify-center border border-[#A60A07]">
                  {cart.count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
