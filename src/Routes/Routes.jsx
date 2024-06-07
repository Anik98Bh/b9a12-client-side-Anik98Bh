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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
            {
                path: "viewBooked",
                element: <ViewBooked />,
            },
            {
                path: "createNote",
                element: <CreateNote />,
            },
            {
                path: "personalNotes",
                element: <PersonalNotes />,
            },
        ],
    }
]);