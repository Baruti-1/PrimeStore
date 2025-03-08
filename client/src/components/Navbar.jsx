import React from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-200 items-center space-x-2 flex"
        >
          Prime Store
        </Link>
        <nav className="flex flex-wrap items-center gap-4">
          {user && (
            <Link
              to={"/cart"}
              className="relative group text-yellow-200 hover:text-yellow-100 transition duration-300
					 ease-in-out"
            >
              <ShoppingCart
                className="inline-block mr-1 group-hover:text-emerald-100"
                size={20}
              />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span
                  className="absolute -top-2 -left-2 bg-yellow-800 text-yellow-200 rounded-full px-2 py-0.5 
									text-xs group-hover:bg-yellow-700 transition duration-300 ease-in-out"
                >
                  {cart.length}
                </span>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              className="bg-yellow-800 hover:bg-yellow-700 text-yellow-200 px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
              to={"/secret-dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="bg-gray-700 hover:bg-gray-600 text-yellow-200 py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="bg-yellow-800 hover:bg-yellow-700 text-yellow-200 py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="bg-gray-700 hover:bg-gray-600 text-yellow-200 py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
