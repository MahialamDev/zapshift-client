import React from 'react';
import { XCircle } from "lucide-react";
import { Link } from 'react-router';

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try again anytime.
        </p>

              <Link to='/dashboard/my-parcels'>
                <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
          Try Again
        </button>
              </Link>
      </div>
    </div>
  );
}