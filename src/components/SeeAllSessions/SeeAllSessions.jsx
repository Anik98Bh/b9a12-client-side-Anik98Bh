import React, { useState } from 'react';
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { GrNext, GrPrevious } from "react-icons/gr";
import Study from "../Study/Study";

const SeeAllSessions = () => {
    const axiosCommon = useAxiosCommon();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSessions = async (key, page = 1) => {
        const { data } = await axiosCommon.get(`/all-approved-session?page=${page}`);
        return data;
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['sessions', currentPage],
        queryFn: ({ queryKey }) => fetchSessions(queryKey, currentPage)
    });

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < data.totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-5">See All Sessions</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {data.items.map(item => (
                    <Study key={item._id} item={item} />
                ))}
            </div>
            <div className='pagination mt-20 text-center'>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn"
                >
                    <GrPrevious /> Prev
                </button>
                <span className=''>Page {currentPage} of {data.totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === data.totalPages}
                    className="btn"
                >
                    Next <GrNext />
                </button>
            </div>
        </div>
    );
};

export default SeeAllSessions;