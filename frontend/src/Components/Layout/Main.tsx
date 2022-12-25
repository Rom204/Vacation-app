// REACT IMPORTS 
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// MUI IMPORTS
import { Box } from "@mui/material";
//MY IMPORTS
import { UserModel } from "../../Models/user_model";
import { Admin } from "../Pages/Admin";
import Follow from "../Pages/Follow";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register/Register";
import Vacations from "../Pages/Vacations";
import { PrivateAdminRouter, PrivateOutletRouter } from "../Services/Private_Route_Service";

function Main(): JSX.Element {
    // const [user, setUser] = useState<UserModel>()
    // useEffect(() => {
    //     // Validations_Service.ValidationByJWT();
    //     // setUser(store.getState().userState.user)
    // },[])
    return (
        <Box >
			<Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/vacations" element={<Vacations/>}/>
                <Route path="/user" element={<PrivateAdminRouter/>}>
                    <Route path="admin" element={<Admin/>}/>
                </Route>
                {/* follow route needed to be a protected route  */}
                <Route path="/user" element={<PrivateOutletRouter/>}>
                    <Route path="follow" element={<Follow/>}/>
                </Route>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Box>
    );
}
export default Main;