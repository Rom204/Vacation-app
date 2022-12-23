import { Navigate, Outlet } from "react-router-dom";
import Validations_Service from "./Validations_Service";


function PrivateOutletRouter() {
    const auth = Validations_Service.ValidationOfUser();
    return auth ? <Outlet/> : <Navigate to="/login" />;
}
function PrivateAdminRouter() {
    const auth = Validations_Service.ValidationOfAdmin();
    return auth ? <Outlet/> : <Navigate to="/user/admin" />;
}

export {
    PrivateOutletRouter,
    PrivateAdminRouter,
}