import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdFindReplace } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AssingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });


  const { data: riders=[], } = useQuery({
    queryKey: ['riders', selectedParcel],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/available?status=approved&workStatus=available&district=${selectedParcel.senderDistrict}`);
      return res.data;
    }
  })

  // console.log(parcels);

  const findForRiders = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssingRider = rider => {
    const updateInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
    }
    axiosSecure.patch(`/parcels/${selectedParcel._id}`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          parcelRefetch()
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Rider has been assinged!",
              showConfirmButton: false,
              timer: 1500
            });
      }
    })
  }

  console.log(selectedParcel);

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-secondary text-center my-5 p-2 underline font-semibold">Pending For Assing Riders {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Ammount</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost} $</td>
                <td>{new Date(parcel.created_At).toDateString()}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  {/* Find RIders */}
                  <button
                    onClick={() => findForRiders(parcel)}
                    className="btn transition duration-500 border-2 border-primary rounded-md hover:bg-primary  text-secondary"
                  >
                    <MdFindReplace />
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog
          ref={riderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Riders Found {riders.length}</h3>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>District</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Available Ridess */}
                  {riders.map((rider , i)=> <tr key={rider._id}>
                    <th>{i + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.district}</td>
                    <td>
                      <button onClick={()=>handleAssingRider(rider)} className="btn transition duration-500 border-2 border-primary rounded-md hover:bg-primary  text-secondary">
                        <FaCheckCircle size={20}/>
                        Assing Riders
                      </button>
                    </td>
                  </tr>)}
                  
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AssingRiders;
