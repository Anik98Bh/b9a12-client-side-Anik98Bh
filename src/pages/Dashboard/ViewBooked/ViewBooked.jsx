import { Link } from "react-router-dom";

const ViewBooked = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-4">View booked session</h1>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <Link to="">
                            <button className="btn btn-primary">View Detail</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBooked;