
const Study = ({item}) => {
    const {sessionTitle,tutorName,tutorEmail,sessionDescription,registrationStartDate,registrationEndDate,classStartDate,classEndDate,sessionDuration,registrationFee,status}=item;
    return (
        <div className="card w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-3">{sessionTitle}</h2>
                <p>{sessionDescription}</p>
                <div className="card-actions justify-between bottom-0 mt-5">
                    <button className="btn btn-primary btn-sm">{status}</button>
                    <button className="btn btn-primary btn-sm">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Study;