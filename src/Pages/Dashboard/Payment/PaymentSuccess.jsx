import React from 'react';
import { CheckCircle } from "lucide-react";
import { Link } from 'react-router';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully. Thank you for your purchase!
        </p>

              <Link to='/dashboard'>
                <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
          Go to Dashboard
        </button>
              </Link>
      </div>
    </div>
  );
}