import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const isAdmin = true;
    const isTutor = false;
    return (
        <div className="flex">
            <div className="w-64 min-h-screen ">
                <h2 className="text-xl font-bold text-center mt-2">Student Route</h2>
                <ul className="menu">
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
                                <li><NavLink to="/dashboard/viewAll">View All</NavLink></li>
                            </>
                    }

                    <div className="divider"></div>

                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;