import { useEffect, useState } from "react";

import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

import { UserModel } from "../../Models/user_model";

function Home(): JSX.Element {
    // const [user, setUser] = useState<UserModel>()
    // useEffect(() => {
    // },[]);
    
    return (
        <Box sx={{  height: "100%", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
            <Box sx={{ height: "90%" , width: {xs: "90%", md: "90%"}, display: "flex",  flexDirection: "column", alignItems: "center" }}>
            <Card  elevation={24} sx={{ backgroundColor: "whitesmoke", height: "55%" , width: {xs: "70%", md: "45%"}, display: "flex",  flexDirection: "column", alignItems: "center", margin: "1rem" }}>
        <CardHeader
          title="this is tile"
          subheader={"sub header"}
        />
        <CardMedia
        component="video" 
        controls 
        src="../../../public/Assets/video.mp4"
        autoPlay 
        height="240"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            check
          </Typography>
          <Typography variant="body2" color="text.secondary">
            check
          </Typography>
        </CardContent>
        </Card>
            </Box>
        </Box>
    );
}
export default Home;