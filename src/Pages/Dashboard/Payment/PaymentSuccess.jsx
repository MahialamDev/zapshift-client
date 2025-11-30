import React, { useEffect, useState } from 'react';
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function PaymentSuccess() {

  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false); 

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && !fetched) { 
      setLoading(true);
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.trackingId && res.data.transitionId) {
            setPaymentInfo({
              trackingId: res.data.trackingId,
              transitionId: res.data.transitionId
            });
          }
          setFetched(true);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure, fetched]);

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

        {loading ? (
          <p className="text-gray-500 mb-4">Loading payment info...</p>
        ) : (
          <>
            <p className='text-secondary font-semibold mb-2'>
              Transition ID : <span className='text-primary'>{paymentInfo?.transitionId || "N/A"}</span>
            </p>
            <p className='text-secondary font-semibold mb-4'>
              Tracking ID : <span className='text-primary'>{paymentInfo?.trackingId || "N/A"}</span>
            </p>
          </>
        )}

        <Link to='/dashboard/my-parcels'>
          <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
