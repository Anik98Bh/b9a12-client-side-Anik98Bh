import { FaEdit, FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const ViewAllMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [id, setId] = useState();
    const modalRef = useRef();

    const { data: materials = [], refetch } = useQuery({
        queryKey: ['material', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

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
        console.log(res.data);
        if (res?.data.success) {
            const materialsData = {
                ...data,
                image: res?.data?.data?.display_url
            };
            const materialsRes = await axiosSecure.patch(`/update-materials/${id._id}`, materialsData);
            console.log(materialsRes.data);
            if (materialsRes?.data?.modifiedCount) {
                // Show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Materials Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Close the modal
                modalRef.current.close();
                refetch();
            }
        }
    };

    const handleMaterialUpdate = id => {
        document.getElementById('my_modal_5').showModal();
        const updateMaterial = materials?.find(material => material._id === id);
        setId(updateMaterial);
    };

    const handleDeleteMaterials = id => {
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
                axiosSecure.delete(`/delete-materials/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

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
                                <td>
                                    <a className="btn btn-circle" href={material.url}><FaGoogleDrive className="text-2xl"></FaGoogleDrive></a>
                                </td>
                                <td>
                                    <button onClick={() => handleMaterialUpdate(material._id)}
                                        className="btn"><FaEdit className="text-2xl"></FaEdit></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteMaterials(material?._id)} className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* modal update */}
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Now</h3>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}
                                className="card-body">
                                <div className="">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Image</span>
                                        </label>
                                        <input type="file" {...register("image")} name="image" placeholder="image" className="file-input input-bordered" defaultValue={id?.image} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Google Drive Link</span>
                                        </label>
                                        <input type="text" {...register("url")} name="url" placeholder="url" className="input input-bordered" defaultValue={id?.url} />
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <div className="modal-action">
                                        {/* if there is a button in form, it will close the modal */}
                                        <input className="btn btn-primary" type="submit" value="Update Materials" />
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
