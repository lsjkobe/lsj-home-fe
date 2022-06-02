import Default from "@/page/default";
import Home from "@/page/Home";

const CONTENT_ROUTE = [
    {
        path: "/default",
        name: "默认",
        auth: true,
        element: <Home/>,
    },
    {
        path: "/group",
        auth: true,
        element: <Home/>,
    },
    {
        path: "/role",
        auth: false,
        element: <Home/>,
    },
]

export default CONTENT_ROUTE;