
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";


function Home(): JSX.Element {
    
    return (
        <Box sx={{  height: "100vh", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundColor:"#303950" }}>
          <Box sx={{ height: "33%" , width:"100%", display: "flex",  flexDirection: "column", alignItems: "center", backgroundColor:"rgb(247, 250, 252)" }}></Box>
          <Box sx={{ height: "33%" , width:"100%", display: "flex",  flexDirection: "column", alignItems: "center", backgroundColor:"blue" }}></Box>
          <Box sx={{ height: "33%" , width:"100%", display: "flex",  flexDirection: "column", alignItems: "center", backgroundColor:"linear-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%), rgb(235, 244, 255)" }}></Box>
        </Box>
    );
}
export default Home;