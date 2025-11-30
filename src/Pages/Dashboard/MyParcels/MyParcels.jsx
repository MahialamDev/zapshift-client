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

const MyParcels = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Tex stak querry
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels)

  // console.log(parcels);

  // Stripe my payment 
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost
    }

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

    window.location.assign(res.data.url);

  }

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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Sl NO.</th>
            <th>Parcel Name</th>
                      <th>Sender Name</th>
                      <th>Price</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {parcels.map((parcel, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{parcel.parcelName}</th>
              <th>{parcel.senderName}</th>
              <th>{parcel.cost}</th>
              <th>
                {
                  parcel?.paymentStatus === 'paid' ? <span className="text-primary cursor-not-allowed">Paid</span> : <button className="btn hover:bg-primary border-2 border-primary px-4 py-2 text-black "  onClick={()=> handlePayment(parcel)}>{loading? <span className="loading loading-spinner text-accent"></span> : <span>Pay</span>}</button>
                 }
                
                {/* <button className="btn hover:bg-primary border-2 border-primary px-4 py-2 text-black "  onClick={()=> handlePayment(parcel)}>{loading? <span className="loading loading-spinner text-accent"></span> : <span>Pay</span>}</button> */}
                      {/* <Link to={`/dashboard/payment/${parcel._id}`}>

                          <PrimaryBtn>Pay</PrimaryBtn>
                      </Link> */}
              </th>
              <th>
                <button className="text-xl hover:bg-primary text-center btn ">
                  <BiSolidEdit />
                </button>
                <button className="text-xl hover:bg-primary text-center btn mx-5">
                  <VscOpenPreview />
                </button>
                <button
                  onClick={() => handleDeleteParcel(parcel._id)}
                  className="text-xl hover:bg-primary text-center btn "
                >
                  <MdDeleteForever />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
