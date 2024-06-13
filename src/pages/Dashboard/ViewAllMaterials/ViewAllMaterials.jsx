import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const ViewAllMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const { data: materials = [],refetch } = useQuery({
        queryKey: ['material', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials/${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        const image = data.image[0];
        const binaryImg = new FormData();
        binaryImg.append("image", image);
        const res = await axiosCommon.post(
            `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
            binaryImg, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data)
        // if (res?.data.success) {
        //     const materialsData = {
        //         ...data,
        //         image: res?.data?.data?.display_url
        //     }
        //     const materialsRes = await axiosSecure.post('/create-materials', materialsData);
        //     console.log(materialsRes.data);
        //     if (materialsRes?.data?.insertedId) {
        //         // show success popup
        //         reset();
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: 'Materials added Successfully',
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //     }
        // }

    };

    const handleDeleteNote = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) =>{
            if (result.isConfirmed) {
                axiosSecure.delete(`/notes/${id}`)
                    .then(res => {
                        console.log(res.data)
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
        })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Session Title</th>
                            <th>Tutor Details</th>
                            <th>Drive Link</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materials?.map((material, idx) => <tr key={material._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={material.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {material.title}
                                </td>
                                <td> {material.email}</td>
                                <th>
                                    <a href={material.url}>{material.url}</a>
                                </th>
                                <td>
                                    <button onClick={() => document.getElementById('my_modal_5').showModal()}
                                    className="btn"><FaEdit className="text-2xl"></FaEdit></button>
                                    </td>
                                <td>
                                    <button onClick={()=>handleDeleteNote(material?._id)}  className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* modal */}
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Now</h3>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}
                                className="card-body">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" {...register("title", { required: true })} name="title" placeholder="Title" className="input input-bordered" />
                                </div>
                                <div className="">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Image</span>
                                        </label>
                                        <input type="file" {...register("image", { required: true })} name="image" placeholder="image" className="file-input input-bordered" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Google Drive Link</span>
                                        </label>
                                        <input type="text" {...register("url", { required: true })} name="url" placeholder="url" className="input input-bordered" />
                                    </div>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                                </div>
                                <div className="form-control mt-6">
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <input className="btn btn-primary" type="submit" value="Update Materials" />
                                        </form>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ViewAllMaterials;