import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";

const ViewAllStudy = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: session = [] } = useQuery({
        queryKey: ['session', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all-session?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(session)

    const handleNewApproval=()=>{

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
                            session?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.title}</td>
                                <td>
                                    <p>{item.name}</p>
                                    <p>{item.email}</p>
                                </td>
                                <td>
                                    <p className="bg-[#b7caef] text-center rounded-full py-1 font-bold">{item.status}</p>
                                </td>
                                {item?.status === "rejected" &&
                                    <td><button onClick={handleNewApproval(item._id)}> New Approval</button></td>}
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllStudy;