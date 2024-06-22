import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useTutor from "../../../hooks/useTutor";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();

    const navOptions = <>
        {
            isAdmin ? <>
                <li><NavLink to="/dashboard/viewAllUsers">View All Users</NavLink></li>
                <li><NavLink to="/dashboard/viewAllStudySession">View All Study Session</NavLink></li>
                <li><NavLink to="/dashboard/allMaterials">View all materials</NavLink></li>
            </> :
                isTutor ? <>
                    <li><NavLink to="/dashboard/createStudy">Create Study Session</NavLink></li>
                    <li><NavLink to="/dashboard/viewAllStudy">View all study sessions</NavLink></li>
                    <li><NavLink to="/dashboard/uploadMaterials">Upload materials</NavLink></li>
                    <li><NavLink to="/dashboard/viewAllMaterials">View all materials</NavLink></li>
                </> : <>
                    <li><NavLink to="/dashboard/viewBooked">View booked</NavLink></li>
                    <li><NavLink to="/dashboard/createNote">Create Note</NavLink></li>
                    <li><NavLink to="/dashboard/personalNotes">Manage Personal Notes</NavLink></li>
                    <li><NavLink to="/dashboard/viewAll">View All Materials</NavLink></li>
                </>
        }
        <div className="divider"></div>

        <li><NavLink to="/">Home</NavLink></li>
    </>
    return (
        <div className="md:flex">
            <div className="md:w-64 md:min-h-screen bg-blue-50">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <h2 className="text-xl font-bold text-center mt-2">{isAdmin ? "Admin" : isTutor ? "Tutor" : "Student"} Routes</h2>
                <ul className="menu dashboard-ul font-bold">
                    {navOptions}
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;