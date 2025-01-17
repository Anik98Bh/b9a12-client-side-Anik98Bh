import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            <div className="pb-14">
                {noHeaderFooter || <Navbar></Navbar>}
            </div>
            <Outlet></Outlet>
            {!noHeaderFooter && <Footer></Footer>}
        </div>
    );
};

export default Main;