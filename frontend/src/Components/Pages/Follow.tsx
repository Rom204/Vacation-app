import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserModel } from "../../Models/user_model";
import { store } from "../../Redux/store";
import Validations_Service from "../Services/Validations_Service";

function Follow(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
    useEffect(() => {
        // Validations_Service.ValidationByJWT();
        // setUser(store.getState().userState.user)
    },[]);

    
    return (
        <Box sx={{ padding:"3rem", height: "100%", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
            <Box>
            <Card elevation={24} sx={{ backgroundColor: "whitesmoke", height: "75%" , width: {xs: "90%", md: "65%"}, display: "flex",  flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5">follow</Typography>
            </Card>
            </Box>
        </Box>
    );
}

export default Follow;