import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingAnimation from "../../../Components/Loader/LoadingAnimation/LoadingAnimation";

const UserManagment = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");


  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      console.log(res.data);
      return res.data;
    },

    


  });

  // Make admin
  const handleMakeAdmin = (user) => {
    const roleInfo = {
      role: "admin",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Mark As Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: `${user.displayName} Marked As A Admin!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = {
      role: "user",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Remove From Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: `${user.displayName} Remove From Admin !`,
              icon: "success",
            });
          }
        });
      }
    });
  };






  // if (isLoading) {
  //   return <LoadingAnimation />;
  // }





  return (
    <div>
      <h2 className="my-4 text-center font-semibold text-secondary text-2xl md:text-4xl">
        Users Mangment ({users?.length})
      </h2>
      {searchText}
      <div className="my-10">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" onChange={e => {
            e.preventDefault();
            setSearchText(e.target.value);
          } } className="grow" placeholder="Search" />
        </label>
      </div>

      {
        isLoading? <LoadingAnimation /> : <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>User Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td className="space-x-4">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn  bg-red-400"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn  bg-green-400"
                    >
                      <FaUserCheck />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn bg-red-400 text-white">
                    Delete User
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default UserManagment;
