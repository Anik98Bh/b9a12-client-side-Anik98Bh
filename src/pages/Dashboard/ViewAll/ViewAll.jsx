import { FaDownload } from "react-icons/fa";

const ViewAll = () => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="p-4"><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="rounded-xl" alt="" /></figure>
                <button className="absolute right-0 mr-4 mt-4 px-4 flex items-center gap-2">Download <FaDownload></FaDownload></button>
                <div className="card-body">
                    <h2 className="card-title">Title</h2>
                    <p>Description</p>
                    <p>Drive Link: <a href="" className="underline">aaaaaaaaaaaaa</a></p>
                </div>
            </div>
        </div>
    );
};

export default ViewAll;