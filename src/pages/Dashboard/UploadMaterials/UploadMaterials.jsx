import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const UploadMaterials = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosCommon = useAxiosCommon();
    const [id, setId] = useState(null);

    const scrollContainerRef = useRef(null);


    const { data: approvedSession = [] } = useQuery({
        queryKey: ['approved-session', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all-approved-session/${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    console.log(approvedSession);

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
        try {
            const response = await axiosCommon.post('/create-materials', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            reset();
        } catch (error) {
            console.error("There was an error creating the note!", error);
        }
    };

    const handleAdd = (id) => {
        console.log(id)
        setId(id)
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            approvedSession?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.title}</td>
                                <td>
                                    <p>{item.name}</p>
                                    <p>{item.email}</p>
                                </td>
                                <td>
                                    <p className="bg-[#b7caef] text-center rounded-full py-1 font-bold">{item.status}</p>
                                </td>
                                <td><button onClick={() => handleAdd(item._id)} className="btn btn-sm btn-accent">Upload Materials</button></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                ref={scrollContainerRef}
                className="card-body my-44">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Session Title</span>
                    </label>
                    <input type="text" {...register("title", { required: true })} name="title" placeholder="Session Title" className="input input-bordered" />
                </div>
                <div className="flex gap-5">
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
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Id</span>
                        </label>
                        <input type="text" {...register("id", { required: true })} name="id" placeholder="id" className="input input-bordered" defaultValue={id} readOnly />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Upload Materials" />
                </div>
            </form>
        </div>
    );
};

export default UploadMaterials;