import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../components/Main/Main";

const router = createBrowserRouter([
    { 
        path: '/',
        element: <App />,
    },
    { 
        path: '/main',
        element: <Main />,
        // handle: {crumb: () => <Link to></Link>},
        children: [
            {
                path: '/main/second',
                element: <div>second</div>,
                // handle: {crumb: () => "second"}
            }
        ]
    },
    { path: '/X', element: <div>пашол ты</div>}
])

export default router