import Default from "@/page/default";
import Home from "@/page/Home";
import MenuList from "@/page/menu/list";

const CONTENT_ROUTE = [
    {
        path: "/default",
        name: "默认",
        auth: true,
        element: <Default/>,
    },
    {
        path: "/menu/list",
        name: "菜单列表",
        auth: true,
        element: <MenuList/>
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