import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PersonalNotes = () => {
    const {user}=useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const { data: notes = [], refetch } = useQuery({
        queryKey: ['note',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes/${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        console.log(data)

    };

    const handleDeleteNote = id => {
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
                axiosSecure.delete(`/notes/${user?._id}`)
                    .then(res => {
                        console.log(res.data)
                        // if (res.data.deletedCount > 0) {
                        //     refetch();
                        //     Swal.fire({
                        //         title: "Deleted!",
                        //         text: "Your file has been deleted.",
                        //         icon: "success"
                        //     });
                        // }
                    })
            }
        });
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
                            <th>Description</th>
                            <th>Student Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notes?.map((note,idx)=> <tr key={note._id}>
                                <th>{idx+1}</th>
                                <td>{note.title}</td>
                                <td>{note.description}</td>
                                <td>{note.email}</td>
                                <td>
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}><FaEdit className="text-2xl"></FaEdit></button>
                                </td>
                                <td>
                                    <button onClick={()=>handleDeleteNote(user?._id)} className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* modal for update */}
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Submit your Review!</h3>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" {...register("title", { required: true })} placeholder="title" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea {...register("description", { required: true })} placeholder="description" className="textarea textarea-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Update Note" />
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default PersonalNotes;