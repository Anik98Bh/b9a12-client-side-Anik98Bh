import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Study = ({ item }) => {
    const { title, description, status, _id, registration_start_date, registration_end_date } = item;
    const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

    useEffect(() => {
        const checkRegistrationStatus = () => {
            const currentDate = new Date();
            const endDate = new Date(registration_end_date);
            if (currentDate > endDate) {
                setIsRegistrationClosed(true);
            } else {
                setIsRegistrationClosed(false);
            }
        };

        checkRegistrationStatus();

        const intervalId = setInterval(checkRegistrationStatus, 1000 * 60);

        return () => clearInterval(intervalId);
    }, [registration_end_date]);

    return (
        <>
            <div className="card w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-3">{title}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-between bottom-0 mt-5">
                        <button className="btn btn-primary btn-outline btn-sm">
                            {isRegistrationClosed ? 'Closed' : 'Ongoing'}</button>
                        <Link to={`/all-session/${_id}`}>
                            <button className="btn btn-primary btn-sm">Read More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Study;