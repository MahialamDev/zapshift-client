import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingAnimation from "../../../Components/Loader/LoadingAnimation/LoadingAnimation";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentsHistory = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
  <p className="my-5 text-2xl md:text-4xl font-semibold text-center text-primary mb-5 md:mb-10">
    MY Payment History ({paymentsHistory.length})
  </p>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Head */}
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">#</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment Status</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Parcel ID</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Transition ID</th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Tracking ID</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {paymentsHistory.map((history, index) => (
          <tr
            key={history._id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <th className="py-3 px-4 text-sm text-gray-500">{index + 1}</th>
            <td className="py-3 px-4 font-medium text-gray-500">{history.parcelName}</td>
            <td className="py-3 px-4 text-gray-600">
              ${(history.amount / 100).toFixed(2)} {history.currency.toUpperCase()}
            </td>
            <td className="py-3 px-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  history.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {history.paymentStatus}
              </span>
              <span className="ml-2 text-gray-500 text-xs">
                {new Date(history.paidAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }).replace(/\//g, "-")}
              </span>
            </td>
            <td className="py-3 px-4 font-mono text-sm text-gray-500">{history.parcelId}</td>
            <td className="py-3 px-4 font-mono text-sm text-gray-500">{history.transitionId}</td>
            <td className="py-3 px-4 font-mono text-sm text-gray-500">{history.trackingId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default PaymentHistory;
