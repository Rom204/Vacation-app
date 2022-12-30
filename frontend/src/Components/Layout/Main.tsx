// REACT IMPORTS 
import { Routes, Route } from "react-router-dom";
// MUI IMPORTS
import { Box } from "@mui/material";
//MY IMPORTS
import { Admin } from "../Pages/Admin";
import Follow from "../Pages/Follow";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register/Register";
import Vacations from "../Pages/Vacations";
import { PrivateAdminRouter, PrivateOutletRouter } from "../Services/Private_Route_Service";

function Main(): JSX.Element {
    
    return (
        <Box >
			<Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/user" element={<PrivateOutletRouter/>}>
                    <Route path="vacations" element={<Vacations/>}/>
                </Route>
                <Route path="/user" element={<PrivateAdminRouter/>}>
                    <Route path="admin" element={<Admin/>}/>
                </Route>
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