import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ViewAllStudy = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: allSession = [], refetch } = useQuery({
        queryKey: ['session', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all-session/${user?.email}`)
            return res.data;
        }
    })
    console.log(allSession)

    // const { data: feedbacks = [] } = useQuery({
    //     queryKey: ['feedback',],
    //     queryFn: async () => {
    //         const res = await axiosCommon.get(`/rejection-feedback`)
    //         return res.data;
    //     }
    // })

    const handleNewApproval = (id) => {
        const newApproval = allSession.find(item => item._id === id);

        if (newApproval) {
            const { _id, ...newData } = newApproval;

            newData.status = 'pending';
            axiosCommon.post('/create-session', newData)
                .then(response => {
                    if (response.data.insertedId) {

                        axiosCommon.delete(`/delete-session/${id}`)
                        refetch();
                    }
                    refetch();
                })
                .catch(error => {
                    console.error('Error updating data:', error);
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
                            allSession?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.title}</td>
                                <td>
                                    <p>{item.tutorName}</p>
                                    <p>{item.tutorEmail}</p>
                                </td>
                                <td>
                                    <p className="bg-[#b7caef] text-center rounded-full py-1 font-bold">{item.status}</p>
                                </td>
                                {item?.status === "rejected" &&
                                    <td><button onClick={() => handleNewApproval(item._id)} className="btn font-bold"> New Approval</button></td>}
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* get feedback */}
            {/* <div className="mt-20">
                {feedbacks.length > 0 ? <>
                    <h1 className=" text-3xl font-bold text-center my-10">Feedback</h1>
                </> : ' '}
                <div className="grid md:grid-cols-2 place-items-center">
                    {
                        feedbacks?.map(feedback => <div key={feedback._id}>
                            <div className="card w-96 bg-base-100 shadow-xl mt-10">
                                <div className="p-5">
                                    <div className="">
                                        <h2 className="card-title">{ }</h2>
                                        <p className="flex gap-2"><b>Rejection Reason:</b> { } </p>
                                    </div>
                                    <hr className="my-3" />
                                    <p><b>Feedback: </b>{ }</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div> */}
        </div>
    );
};

export default ViewAllStudy;