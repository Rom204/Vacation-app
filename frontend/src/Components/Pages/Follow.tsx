
import { Box, Card, Typography } from "@mui/material";

function Follow(): JSX.Element {

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