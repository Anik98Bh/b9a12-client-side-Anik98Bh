import { useForm } from "react-hook-form";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import UpdateData from "./UpdateData";
import RejectionModal from "./RejectionModal";

const ViewAllStudySession = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const [updateId, setUpdateId] = useState();
    const [id, setId] = useState();
    const [updateSession, setUpdateSession] = useState();
    const modalRef = useRef();

    const { data: allSession = [], refetch } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all-session`)
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        const approveData = {
            ...data,
            status: 'approved'
        }
        try {
            const response = await axiosCommon.patch(`/update-session/${updateId}`, approveData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            modalRef.current.close();
            refetch()
            reset();
        } catch (error) {
            console.error("There was an error creating the note!", error);
        }
    };

    const handleUpdate = id => {
        document.getElementById('my_modal_5').showModal()
        setUpdateId(id)
    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/delete-session/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleEdit = id => {
        document.getElementById('my_modal_6').showModal()
        const updateSession = allSession?.find(session => session._id === id);
        setUpdateSession(updateSession)

    }


    const handleReject = async (id) => {
        document.getElementById('my_modal_7').showModal()
        const rejectData = { status: 'rejected' }
        try {
            const response = await axiosCommon.patch(`/update-session/${id}`, rejectData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            refetch()
            reset();
        } catch (error) {
            console.error("There was an error creating the note!", error);
        }
        setId(id)
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Session Title</th>
                            <th>Tutor Details</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSession?.map((session, idx) => {
                                if (session.status !== 'rejected') {
                                    return (<tr key={session._id}>
                                        <th>{idx + 1}</th>
                                        <td>{session.title}</td>
                                        <td>
                                            <p>{session.tutorName}</p>
                                            <p>{session.tutorEmail}</p>
                                        </td>
                                        <td><p className="bg-[#a7d3f3] rounded-full font-bold py-1 text-center">{session.status}</p></td>
                                        <td className="flex gap-3">
                                            {
                                                session.status === 'approved' ? <>
                                                    <button onClick={() => handleEdit(session._id)} className="btn btn-circle"><MdEdit className="text-2xl" /></button> <button
                                                        onClick={() => handleDelete(session._id)}
                                                        className="btn btn-circle"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button> </> : session.status === 'pending' ? <>
                                                            <button className="btn btn-circle" onClick={() => handleUpdate(session._id)}>
                                                                <GiConfirmed className="text-3xl"></GiConfirmed>
                                                            </button>
                                                            <button onClick={() => handleReject(session._id)} className="btn btn-circle"><GiCancel className="text-3xl"></GiCancel></button>
                                                        </> : ' '
                                            }


                                        </td>
                                    </tr>)
                                }
                            })
                        }

                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Approval!</h3>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Registration Fee</span>
                                    </label>
                                    <input type="number" {...register("fee", { required: true })} name="fee" placeholder="registration Fee" className="input input-bordered" defaultValue={'0'} />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Update Session" />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* update modal */}
            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <UpdateData updateSession={updateSession}></UpdateData>
            </dialog>
            {/* reject modal */}
            <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <RejectionModal id={id}></RejectionModal>
            </dialog>
        </div>
    );
};

export default ViewAllStudySession;