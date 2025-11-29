import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Error404 from "../Components/Error/Error404";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import PrivateRouter from "./PrivateRouter";
import Rider from "../Pages/Rider/Rider";
import PublicRouter from "./PublicRouter";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        // errorElement: <Error404></Error404>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'about',
            },
            {
                path: 'send-parcel',
                element: <PrivateRouter><SendParcel /></PrivateRouter>,
                loader: () => fetch('../serviceCenters.json').then(res => res.json())
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('../serviceCenters.json').then(res => res.json())
            },
            {
                path: 'rider',
                element: <PrivateRouter> <Rider /> </PrivateRouter>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancel',
                Component: PaymentCancelled
            },
            
        ]
    }
])

export default router;

