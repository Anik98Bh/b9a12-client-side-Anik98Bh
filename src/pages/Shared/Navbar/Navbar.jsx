import { Link } from "react-router-dom";
import logo from "../../../../public/color_logo-wm-lm_dimensions.png"
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => {
                console.log(error)
            });
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        {/* {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        } */}
        {/* <li>
            <Link to="/dashboard/cart">
                <button className="btn btn-sm">
                    <FaShoppingCart className="mr-2" />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li> */}
        {
            // user ? <>
            //     {/* <span>{user?.displayName}</span> */}
            //     <button onClick={handleLogout} className="btn btn-sm btn-ghost">Log Out</button>
            // </> : <>
            //     <li><Link to="/login">Login</Link></li>
            // </>
        }
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="flex">
                        <img src={logo} className="w-16 h-10" alt="" />
                        <a className="btn btn-ghost text-xl">StudyBuddyHub</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {/* profile */}
                    {
                        user?.email ? <>
                            <p><Link to="/dashboard">Dashboard</Link></p>
                            <div className="dropdown dropdown-end dropdown-hover">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-16 rounded-full">
                                        <img src={
                                            user?.photoURL ? user?.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rlHILcxkNp4iwSUhRCeGjQAnZcisSGs9txj5d4FvFr782-NoItG0iDd0GD0eK4WITxU&usqp=CAU'
                                        } />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-auto">
                                    <li>
                                        <button className="btn btn-sm">
                                            {user?.displayName || user?.email}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="btn btn-sm">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                            :
                            <>
                                <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                                <Link to="/register"><button className="btn btn-secondary">Sign Up</button></Link>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;