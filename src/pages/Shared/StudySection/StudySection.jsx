import { useEffect, useState } from "react";
import Study from "../../../components/Study/Study";
import { Link } from "react-router-dom";

const StudySection = () => {
    const [study, setStudy] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/study')
            .then(res => res.json())
            .then(data => setStudy(data))
    }, [])

    return (
        <div>
            <h2 className="text-4xl font-bold text-center mt-20 mb-8">Study Session Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    study.slice(0, 6)?.map(item => <Study
                        key={item._id}
                        item={item}></Study>)
                }
            </div>
            <div className="text-center mt-5">
                <Link to="/seeAllSessions">
                    <button className="btn btn-primary text-white">See All Sessions</button>
                </Link>
            </div>
        </div>
    );
};

export default StudySection;