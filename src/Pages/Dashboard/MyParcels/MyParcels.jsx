import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PrimaryBtn from "../../../Components/UI/Buttons/PrimaryBtn";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingAnimation from "../../../Components/Loader/LoadingAnimation/LoadingAnimation";
import { Banknote, CreditCard, HandCoins } from "lucide-react";

const MyParcels = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Tex stak querry
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });



  if (isLoading) {
    return <LoadingAnimation />;
  }



  // console.log(parcels);

  // Stripe my payment
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  const handleDeleteParcel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              //   RefresH Data
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table Head */}
      <thead className="bg-gray-100 py-2 text-secondary">
        <tr>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Sl NO.</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Parcel Name</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Sender Name</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Price</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Payment Status</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Tracking Id</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Delivery Status</th>
          <th className="py-3 px-4 text-left md:text-xl font-semibold ">Actions</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-200">
        {parcels.map((parcel, index) => (
          <tr
            key={parcel._id || index}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
            <td className="py-3 px-4 text-gray-800 font-medium">{parcel.parcelName}</td>
            <td className="py-3 px-4 text-gray-700">{parcel.senderName}</td>
            <td className="py-3 px-4 text-gray-700 font-mono">${parcel.cost}</td>
            
            <td className="py-3 px-4">
              {parcel?.paymentStatus === "paid" ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold cursor-not-allowed">
                  Paid
                </span>
              ) : (
                <button
                  className="px-4 py-2 bg-white border-2 border-green-500 text-geeen-500 rounded-lg hover:bg-green-500 cursor-pointer hover:text-white transition-colors duration-200 flex items-center justify-center text-sm"
                  onClick={() => handlePayment(parcel)}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                    ) : 
                      <>
                        <HandCoins size={18} /> <span className="pl-2"> Pay</span>
                      </>}
                </button>
              )}
            </td>
            <td className="py-3 px-4 text-gray-700 font-mono">{parcel?.trackingId || "N/A"}</td>
            <td className="py-3 px-4 text-gray-700 font-mono">{parcel?.deliveryStatus || "N/A"}</td>
            <td className="py-3 px-4 flex space-x-3">
              <button className="p-2 cursor-pointer bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white rounded-md transition-colors duration-200 text-lg">
                <BiSolidEdit />
              </button>
              <button className="p-2 cursor-pointer bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white rounded-md transition-colors duration-200 text-lg">
                <VscOpenPreview />
              </button>
              <button
                onClick={() => handleDeleteParcel(parcel._id)}
                className="p-2 cursor-pointer bg-gray-100 hover:bg-red-500 text-gray-600 hover:text-white rounded-md transition-colors duration-200 text-lg"
              >
                <MdDeleteForever />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MyParcels;
