import { useEffect, useState } from "react";

import { Box, Card, Typography } from "@mui/material";

import axios from "axios";

function Follow(): JSX.Element {
    // useEffect(() => {
    //     axios.get(`url`)
    //     .then((response) => {
    //         console.log(response);
    //     })
    // },[]);

    return (
        <Box sx={{ padding:"3rem", height: "100vh", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
            <Box>
                <Card elevation={24} sx={{ backgroundColor: "whitesmoke", height: "75%" , width: {xs: "90%", md: "65%"}, display: "flex",  flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h5">Coming soon...</Typography>
                </Card>
            </Box>
        </Box>
    );
}
export default Follow;