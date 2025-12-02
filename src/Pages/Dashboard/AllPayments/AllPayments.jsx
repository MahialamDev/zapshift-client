import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../../Components/Loader/LoadingAnimation/LoadingAnimation";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allPayments = [], isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  console.log("my Payments", allPayments);

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="p-4">
  {/* Header */}
  <p className="my-5 text-2xl md:text-4xl text-center font-semibold text-primary">
    Payment History ({allPayments.length})
  </p>

  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-200">
      {/* Head */}
      <thead className="bg-primary text-white">
        <tr>
          <th className="py-3 px-4 text-left">#</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Amount</th>
          <th className="py-3 px-4 text-left">Payment Status</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Parcel ID</th>
          <th className="py-3 px-4 text-left">Transition ID</th>
          <th className="py-3 px-4 text-left">Tracking ID</th>
        </tr>
      </thead>

      <tbody>
        {allPayments.map((history, index) => (
          <tr
            key={history._id}
            className={`border-b border-gray-200 hover:bg-secondary group group-hover:text-white transition`}
          >
            {/* Sl No */}
            <td className="py-3 px-4 text-sm text-gray-500 group-hover:text-white">{index + 1}</td>

            {/* Parcel Name */}
            <td className="py-3 px-4 font-medium text-gray-800 group-hover:text-white">
              {history.parcelName}
            </td>

            {/* Amount */}
            <td className="py-3 px-4 text-gray-500 group-hover:text-white">
              ${(history.amount / 100).toFixed(2)} {history.currency.toUpperCase()}
            </td>

            {/* Payment Status */}
            <td className="py-3 px-4 group-hover:text-white">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  history.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {history.paymentStatus}
              </span>
            </td>

            {/* Date */}
            <td className="py-3 px-4 text-gray-500 group-hover:text-white">
              {new Date(history.paidAt)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")}
            </td>

            {/* Parcel ID */}
            <td className="py-3 px-4 font-mono text-sm text-gray-500 group-hover:text-white">
              {history.parcelId}
            </td>

            {/* Transition ID */}
            <td className="py-3 px-4 font-mono text-sm text-gray-500 group-hover:text-white">
              {history.transitionId}
            </td>

            {/* Tracking ID */}
            <td className="py-3 px-4 font-mono text-sm text-gray-500 group-hover:text-white">
              {history.trackingId}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AllPayments;
