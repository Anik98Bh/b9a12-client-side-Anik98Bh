import { FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const AllMaterials = () => {
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
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td><a className="btn btn-circle" href=""><FaGoogleDrive className="text-2xl"></FaGoogleDrive></a></td>
                            <td>
                                <button className="btn btn-circle"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMaterials;