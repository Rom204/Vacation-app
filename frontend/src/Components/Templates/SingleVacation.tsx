import axios from "axios";
import { useState } from "react";
import { UserModel } from "../../Models/user_model";
import { VacationModel } from "../../Models/vacation_model";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

interface props extends VacationModel {
  
}
interface iprops extends UserModel {
  filter: (id:number) => void;
  following: () => void;
}

export default function SingleVacation (vacation : props & iprops) {
  
  const isAuth = useAppSelector((state) => state.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  
  const handleClickOpenEdit = () => {
    setOpenEdit(true)
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleFollow = (vacationID:number) => {
    axios.post(`http://localhost:3000/user/allVacations/${vacationID}/${isAuth.user_id}`);
    vacation.following()
  };
  const handleUnFollow = (vacationID:number) => {
    axios.delete(`http://localhost:3000/user/allVacationsDelete/${vacationID}/${vacation.user_id}`);
    vacation.following()
  };
  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3000/vacation/delete/${id}`);
    vacation.filter(id);
    handleCloseDelete()
  };

  const handleEdit = () => {
    axios.put(`http://localhost:3000/user/allVacations`)
    handleCloseEdit();
  }
    return (
      <Card key={vacation.id} elevation={24} sx={{ backgroundColor: "whitesmoke", height: "55%" , width: {xs: "70%", md: "45%"}, display: "flex",  flexDirection: "column", alignItems: "center", margin: "1rem" }}>
        <CardHeader
          title={vacation.location}
          subheader={["available between : " + vacation.date_from.toLocaleString().split("T")[0] + " - " +  vacation.date_to.toLocaleString().split("T")[0]]}
        />
        <CardMedia
          component="img"
          alt="vacation image"
          height="240"
          image={`http://localhost:3000/${vacation.imageName}`}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vacation.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vacation.information}
          </Typography>
        </CardContent>

        <CardActions>
          
          {vacation.user_role === "admin" ?
          // _________________Admin Section__________________
            <Box sx={{ display:"flex" }}>
              
              <DeleteDialog 
                vacation_id={vacation.id} 
                state={openDelete} 
                handleOpen={handleClickOpenDelete} 
                handleClose={handleCloseDelete} 
                handleDelete={handleDelete}/>

              <EditDialog 
                vacation_id={0}
                state={openEdit}
                handleOpen={handleClickOpenEdit}
                handleClose={handleCloseEdit}
                handleEdit={handleEdit} id={0} 
                information={vacation.information} 
                location={vacation.location} 
                image={vacation.image} 
                imageName={vacation.imageName} 
                date_from={vacation.date_from} 
                date_to={vacation.date_to} 
                price={vacation.price} 
                user_id={vacation.user_id}/>
            </Box>
            : 
            // ________User Section________
              <Button 
                size="small" 
                color={vacation.user_id !== null ? "error" : "success"}
                variant={vacation.user_id !== null ? "contained" : "outlined"}
                onClick={vacation.user_id !== null ? () => {handleUnFollow(vacation.id)} : () => {handleFollow(vacation.id)}}> 
                {vacation.user_id !== null ? "unFollow" : "Follow"}
              </Button>
          }
        </CardActions>
      </Card>
    );
}