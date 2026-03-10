import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <div>
            <Link
              to="/shop"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 sm:p-8 flex items-center group">
                    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm">
                            <Link to={`/shop`} className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                              {item.name}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{item.brand} | {item.category}</p>
                        </div>
                        <p className="text-lg font-medium text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-gray-900 font-medium text-sm border-x border-gray-300 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-r-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <div className="ml-4">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 flex justify-end">
                <button
                onClick={clearCart}
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors flex items-center"
                >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear entire cart
                </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order summary</h2>
            
            <dl className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt>Subtotal</dt>
                <dd className="text-gray-900 font-medium">Rs. {cartTotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt className="flex items-center">
                  Shipping estimate
                </dt>
                <dd className="text-gray-900 font-medium">Rs. {(cartTotal > 150 ? 0 : 15).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt className="flex items-center">
                  Tax estimate
                </dt>
                <dd className="text-gray-900 font-medium">Rs. {(cartTotal * 0.08).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pt-4">
                <dt className="text-base font-extrabold text-gray-900">Order total</dt>
                <dd className="text-xl font-extrabold text-gray-900">
                  Rs. {(cartTotal + (cartTotal > 150 ? 0 : 15) + (cartTotal * 0.08)).toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-4 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                onClick={() => alert("Checkout pipeline simulation complete for Internship Project!")}
              >
                Proceed to Checkout
              </button>
            </div>
            
            {cartTotal < 150 && (
                <p className="mt-4 text-xs text-center text-gray-500">
                    Add Rs. {(150 - cartTotal).toFixed(2)} more to qualify for free shipping!
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
