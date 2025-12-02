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
                  console.log(res)
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
    <div className="p-4">
  {/* Header */}
  <h1 className="text-2xl md:text-4xl font-semibold py-2 my-4 text-center text-base-content">
    Riders Pending Approval ({riders.length})
  </h1>

  <div className="overflow-x-auto rounded-lg shadow-lg border border-base-200">
    <table className="table-auto w-full border-collapse ">
      {/* Head */}
      <thead className="bg-primary text-white">
        <tr>
          <th className="py-3 px-4 text-left">#</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">District</th>
          <th className="py-3 px-4 text-left">NID</th>
          <th className="py-3 px-4 text-left">Status</th>
          <th className="py-3 px-4 text-left">Work Status</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="bg-base-100">
        {riders.map((rider, index) => (
          <tr
            key={rider._id}
            className="border-b border-base-200 hover:bg-secondary/60 hover:text-white transition group"
          >
            {/* Sl No */}
            <td className="py-3 px-4 group-hover:text-white">{index + 1}</td>

            {/* Name */}
            <td className="py-3 px-4 font-medium group-hover:text-white">{rider.name}</td>

            {/* Email */}
            <td className="py-3 px-4 group-hover:text-white">{rider.email}</td>

            {/* district */}
            <td className="py-3 px-4 group-hover:text-white">{rider.district}</td>

            {/* NID */}
            <td className="py-3 px-4 font-mono group-hover:text-white">{rider.nid}</td>

            
            {/* Status */}
            <td
              className={`py-3 px-4 font-semibold ${
                rider.status === "approved"
                  ? "text-green-600 group-hover:text-white"
                  : "text-red-600 group-hover:text-white"
              }`}
            >
              {rider.status}
            </td>

            
            {/* Work Status */}
            <td className="py-3 px-4 font-mono group-hover:text-white">{rider.workStatus || 'N/A'}</td>

            {/* Actions */}
            <td className="py-3 px-4 space-x-2">
              {/* Details */}
              <button className="btn btn-sm hover:bg-primary hover:text-white transition">
                <MdContentPasteSearch />
              </button>

              {/* Approve */}
              <button
                onClick={() => handleApproval(rider)}
                className="btn btn-sm hover:bg-primary hover:text-white transition"
              >
                <FaUserCheck />
              </button>

              {/* Reject */}
              <button
                onClick={() => handleReject(rider)}
                className="btn btn-sm hover:bg-primary hover:text-white transition"
              >
                <FaUserTimes />
              </button>

              {/* Delete */}
              <button className="btn btn-sm hover:bg-primary hover:text-white transition">
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
