import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUserTimes } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { MdContentPasteSearch } from "react-icons/md";
import Swal from "sweetalert2";

const ApproveRiders = () => {

  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", 'pending'],
    queryFn: async () => {
      const res = await axiosSecure("/riders");
      return res.data;
    },
  });
    
    
    const updateRiderStatus = (updateInfo, rider) => {
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                refetch();
                if (res.data.modifiedCount) {
                     Swal.fire({
                    title: `Rider has been ${updateInfo.status}`,
                    icon: "success"
                             });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                        });
                }
            console.log(res)
        })
    }
    
    
    const handleApproval = rider => {
        const updateInfo = {
            status: 'approved',
            email: rider.email
        }; 
        updateRiderStatus(updateInfo, rider)
    }

    const handleReject = rider => {
        const updateInfo = {
            status: 'rejected',
             email: rider.email
        }; 
        updateRiderStatus(updateInfo, rider)
    }

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold py-2 my-4 text-center">
        Riders Pending Approval {riders.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Nid</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.nid}</td>
                <td
                  className={`${
                    rider.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rider.status}
                </td>
                    <td className="space-x-4">
                        {/* details */}
                  <button className="btn hover:bg-primary">
                    <MdContentPasteSearch />
                        </button>
                        {/* Approve */}
                  <button onClick={()=>handleApproval(rider)} className="btn hover:bg-primary">
                    <FaUserCheck />
                        </button>
                        {/* Reject */}
                  <button onClick={()=>{handleReject(rider)}} className="btn hover:bg-primary">
                    <FaUserTimes />
                        </button>
                        {/* Details */}
                  <button className="btn hover:bg-primary">
                    <FaRegTrashAlt />
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

export default ApproveRiders;
