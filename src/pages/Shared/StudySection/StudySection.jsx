import { useEffect, useState } from "react";
import Study from "../../../components/Study/Study";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const StudySection = () => {
    const axiosCommon = useAxiosCommon();

    const { data: allSession = [], refetch } = useQuery({
        queryKey: ['all-session'],
        queryFn: async () => {
            const res = await axiosCommon.get(`/all-approved-session`)
            return res.data;
        }
    })
console.log('all session study',allSession);
    return (
        <div>
            <h2 className="text-4xl font-bold text-center mt-20 mb-8">Study Session Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    allSession?.items?.map(item => <Study
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