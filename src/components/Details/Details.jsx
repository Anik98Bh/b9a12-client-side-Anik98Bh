import { useLoaderData } from "react-router-dom";

const Details = () => {
    const study = useLoaderData();
    const { sessionTitle, tutorName, tutorEmail, sessionDescription, registrationStartDate, registrationEndDate, classStartDate, classEndDate, sessionDuration, registrationFee, status } = study;

    return (
        <div>
            <div className=" w-full bg-base-100 shadow-xl">
                <div className="px-3 py-5">
                    <h2 className="text-3xl font-bold">{sessionTitle}</h2>
                    <div className="flex justify-between my-4">
                        <p>Tutor Name: {tutorName}</p>
                        <p>Tutor Email: {tutorEmail}</p>
                    </div>
                    <p> Description: {sessionDescription}</p>
                    <div className="flex justify-between my-4">
                        <p>Registration Start Date: {registrationStartDate}</p>
                        <p>Registration End Date: {registrationEndDate}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Class Start Date: {classStartDate}</p>
                        <p>Class End Date: {classEndDate}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Registration Fee: {registrationFee}</p>
                        <p> Duration: {sessionDuration}</p>
                        <p>Status: {status}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;