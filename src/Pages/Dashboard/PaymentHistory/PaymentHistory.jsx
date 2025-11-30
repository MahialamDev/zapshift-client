import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentsHistory = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <p className="my-5 text-2xl md:4xl text-center">Payment History ({paymentsHistory.length})</p>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Parcel ID</th>
                <th>Transition ID</th>
                <th>Tracking ID</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {paymentsHistory.map((history, index) => (
  <tr 
    key={history._id} 
    className="hover:bg-gray-50 border-b border-gray-200 transition"
  >
    {/* Sl No */}
    <th className="py-3 px-2 text-sm text-gray-700">
      {index + 1}
    </th>

    {/* Parcel Name */}
    <td className="py-3 px-2 font-medium text-gray-800">
      {history.parcelName}
    </td>

    {/* Amount */}
    <td className="py-3 px-2 text-gray-600">
      ${(history.amount / 100).toFixed(2)} {history.currency.toUpperCase()}
    </td>

    {/* Payment Status */}
    <td className="py-3 px-2">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold
        ${history.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {history.paymentStatus}
                          </span>
                           <span className="ml-2">
    {new Date(history.paidAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).replace(/\//g, "-")}
  </span>
    </td>

    {/* Parcel ID */}
    <td className="py-3 px-2 font-mono text-sm text-gray-700">
      {history.parcelId}
    </td>

    {/* Transition ID */}
    <td className="py-3 px-2 font-mono text-sm text-gray-700">
      {history.transitionId}
    </td>

    {/* Tracking ID */}
    <td className="py-3 px-2 font-mono text-sm text-gray-700">
      {history.trackingId}
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
