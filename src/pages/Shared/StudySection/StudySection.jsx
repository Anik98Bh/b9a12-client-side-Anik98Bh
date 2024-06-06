import { useEffect, useState } from "react";
import Study from "../../../components/Study/Study";

const StudySection = () => {
    const [study, setStudy] = useState([]);

    useEffect(() => {
        fetch('study.json')
            .then(res => res.json())
            .then(data => setStudy(data))
    }, [])

    return (
        <div>
            <h2 className="text-4xl font-bold text-center mt-20 mb-8">Study Session Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    study.map(item=> <Study 
                        key={item.id} 
                        item={item}></Study>)
                }
            </div>
        </div>
    );
};

export default StudySection;