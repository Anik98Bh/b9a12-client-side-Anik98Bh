import { useState } from "react";
import "./SeeAllSessions.css"

const SeeAllSessions = () => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(20);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    // const handleItemsPerPage = e => {
    //     const val = parseInt(e.target.value);
    //     console.log(val);
    //     setItemsPerPage(val);
    //     setCurrentPage(0);
    // }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <h1>See All Sessions</h1>
            <div className='pagination'>
                <p>Current Page: {currentPage}</p>
                <button 
                onClick={handlePrevPage}
                >Prev</button>
                {
                    pages.map(page => <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'selected' : ' ' }
                        >{page}</button>)
                }
                <button 
                onClick={handleNextPage}
                >Next</button>
                {/* <select value={itemsPerPage} 
                onChange={handleItemsPerPage} 
                name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select> */}
            </div>
        </div>
    );
};

export default SeeAllSessions;