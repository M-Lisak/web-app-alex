import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserForm from "../components/UserForm/UserForm";

const router = createBrowserRouter([
    { 
        path: '/',
        element: <App />,
    },
    { 
        path: '/user',
        element: <UserForm />,
        // handle: {crumb: () => <Link to></Link>},
        children: [
            {
                path: '/user/second',
                element: <div>second</div>,
                // handle: {crumb: () => "second"}
            }
        ]
    },
    { path: '/X', element: <div>пашол ты</div>}
])

export default router