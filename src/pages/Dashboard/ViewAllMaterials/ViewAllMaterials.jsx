import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const ViewAllMaterials = () => {
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
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                            <td><button className="btn"><FaEdit className="text-2xl"></FaEdit></button></td>
                            <td><button className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Booked</td>
                            <td><button className="btn"><FaEdit className="text-2xl"></FaEdit></button></td>
                            <td><button className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Booked</td>
                            <td><button className="btn"><FaEdit className="text-2xl"></FaEdit></button></td>
                            <td><button className="btn"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllMaterials;