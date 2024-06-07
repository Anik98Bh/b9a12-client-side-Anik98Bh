import { Link } from "react-router-dom";

const Study = ({item}) => {
    const {sessionTitle,_id,sessionDescription,status}=item;
    return (
        <div className="card w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-3">{sessionTitle}</h2>
                <p>{sessionDescription}</p>
                <div className="card-actions justify-between bottom-0 mt-5">
                    <button className="btn btn-primary btn-sm">{status}</button>
                    <Link to={`/study/${_id}`}>
                    <button className="btn btn-primary btn-sm">Read More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Study;