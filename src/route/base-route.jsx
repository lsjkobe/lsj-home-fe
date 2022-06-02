import LsjLayout from "@/component/layout/lsj-layout";
import Login from "@/page/Login";

const BASE_ROUTE = [
    {
        path: "/*",
        auth: false,
        element: <LsjLayout />,
    },
    {
        path: "/login",
        auth: false,
        element: <Login />,
    },
]

export default BASE_ROUTE;