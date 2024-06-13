import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Details from "../components/Details/Details";
import ViewBooked from "../pages/Dashboard/ViewBooked/ViewBooked";
import CreateNote from "../pages/Dashboard/CreateNote/CreateNote";
import PersonalNotes from "../pages/Dashboard/PersonalNotes/PersonalNotes";
import ViewAll from "../pages/Dashboard/ViewAll/ViewAll";
import CreateStudy from "../pages/Dashboard/CreateStudy/CreateStudy";
import ViewAllStudy from "../pages/Dashboard/ViewAllStudy/ViewAllStudy";
import ViewAllMaterials from "../pages/Dashboard/ViewAllMaterials/ViewAllMaterials";
import UploadMaterials from "../pages/Dashboard/UploadMaterials/UploadMaterials";
import ViewAllUsers from "../pages/Dashboard/Admin/ViewAllUsers/ViewAllUsers";
import ViewAllStudySession from "../pages/Dashboard/Admin/ViewAllStudySession/ViewAllStudySession";
import AllMaterials from "../pages/Dashboard/Admin/AllMaterials/AllMaterials";
import Payment from "../pages/Dashboard/Payment/Payment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SeeAllSessions from "../components/SeeAllSessions/SeeAllSessions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/study/:id",
                element: <PrivateRoute><Details /></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/study/${params?.id}`)
            },
            {
                path: "/seeAllSessions",
                element: <SeeAllSessions />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin
            {
                path: "viewAllUsers",
                element: <ViewAllUsers />,
            },
            {
                path: "viewAllStudySession",
                element: <ViewAllStudySession />,
            },
            {
                path: "allMaterials",
                element: <AllMaterials />,
            },
            // tutor
            {
                path: "createStudy",
                element: <CreateStudy />,
            },
            {
                path: "viewAllStudy",
                element: <ViewAllStudy />,
            },
            {
                path: "uploadMaterials",
                element: <UploadMaterials />,
            },
            {
                path: "viewAllMaterials",
                element: <ViewAllMaterials />,
            },
            //student
            {
                path: "viewBooked",
                element: <ViewBooked />,
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "createNote",
                element: <CreateNote />,
            },
            {
                path: "personalNotes",
                element: <PersonalNotes />,
            },
            {
                path: "viewAll",
                element: <ViewAll />,
            },
        ],
    }
]);