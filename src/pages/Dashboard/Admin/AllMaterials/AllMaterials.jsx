import { useQuery } from "@tanstack/react-query";
import { FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllMaterials = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: materials = [], refetch } = useQuery({
        queryKey: ['material',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials`)
            return res.data;
        }
    })

    const handleDeleteMaterials = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-materials/${id}`)
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
        })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-5">All Materials</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Session Title</th>
                            <th>Tutor email</th>
                            <th>Drive Link</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materials?.map((material,idx)=>  <tr key={material._id}>
                                <th>{idx+1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={material.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>{material.title}</td>
                                <td>{material.email}</td>
                                <td><a className="btn btn-circle" href={material.url}><FaGoogleDrive className="text-2xl"></FaGoogleDrive></a></td>
                                <td>
                                    <button onClick={() => handleDeleteMaterials(material._id)} className="btn btn-circle"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>
                                </td>
                            </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMaterials;