import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen ">
                <ul className="menu">
                    <li><NavLink to="/dashboard/viewBooked">View booked</NavLink></li>
                    <li><NavLink to="/dashboard/note">Create Note </NavLink></li>
                    <li><NavLink to="/dashboard/personalNotes">Manage Personal Notes</NavLink></li>
                    <li><NavLink to="/dashboard/viewAll">View All</NavLink></li>

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