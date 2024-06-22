import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

const ViewAllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [searchText, setSearchText] = useState('');

    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            if (searchText) {
                const res = await axiosSecure.get(`/users?search=${searchText}`);
        return res.data;
            } else {
                const res = await axiosSecure.get('/users');
                return res.data;
            }
        },
        enabled: true, // Always fetch initially
    });

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wanna make as Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user?._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user?.displayName} is an Admin now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })

    }

    const handleMakeTutor = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wanna make as Tutor!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/tutor/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user?.displayName} is an Tutor now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })

    }

    return (
        <div>
            {/* search bar */}
            <div className="w-1/2 mb-2">
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={handleSearchChange} type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
            {/* user info */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user?.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rlHILcxkNp4iwSUhRCeGjQAnZcisSGs9txj5d4FvFr782-NoItG0iDd0GD0eK4WITxU&usqp=CAU'} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.displayName}
                                </td>
                                <td>{user?.email}</td>
                                <th>
                                    <p className="bg-[#aabceb] rounded-full py-1 pl-3">{user?.role === 'admin' ? 'Admin' : user?.role === "tutor" ? "Tutor" : 'student'}</p>
                                </th>
                                <td className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-circle m-1"><MdEdit className="text-2xl" /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24">
                                        <li><button onClick={() => handleMakeAdmin(user)} className="font-bold">Admin</button></li>
                                        <li><button onClick={() => handleMakeTutor(user)} className="font-bold">Tutor</button></li>
                                    </ul>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllUsers;