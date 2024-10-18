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
    },
    {
        path: '/help',
        element: <div>help</div>,
    },
    {
        path: '/faq',
        element: <div>FAQ</div>,
    },
    { path: '/success', element: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'red', fontSize: 160}}>СКАМ</div>}
])

export default router