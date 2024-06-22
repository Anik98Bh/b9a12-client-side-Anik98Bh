import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ViewBooked = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: booked = [], refetch } = useQuery({
        queryKey: ['book', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-4">View booked session</h1>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    booked?.map(book => <div key={book._id}>
                        <div className="card w-96 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-3">{book.sessionTitle || book.title}</h2>
                                <p>{book.sessionDescription || book.description}</p>
                                <div className="card-actions justify-end bottom-0 mt-5">
                                    <Link to={`/all-session/${book?.session_id}`}>
                                        <button className="btn btn-primary btn-sm">View Detail</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ViewBooked;