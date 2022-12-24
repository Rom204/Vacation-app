import axios from "axios";
import { useState } from "react";
import { UserModel } from "../../Models/user_model";
import { VacationModel } from "../../Models/vacation_model";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
  
  // console.log(vacation);
  // const [vacations, setVacations] = useState<props | iprops>()
  // setVacations(vacation)
  // const [isFollowed, setIsFollowed] = useState<Boolean>(false);
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
              {/* <Tooltip title="Delete vacation post">
                <IconButton onClick={handleClickOpenDelete}>
                  <DeleteIcon color="error"  />
                </IconButton>
              </Tooltip> */}
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
              handleEdit={handleEdit}/>
              {/* <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this vacation?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting this post means you or any other user within this application will no longer be 
                    able to see it never again.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete} autoFocus>Cancel</Button>
                  <Button onClick={() => {handleDelete(vacation.id)}} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog> */}
              
              {/* <Tooltip title="Edit vacation post">
                <IconButton onClick={handleClickOpenEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this vacation?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit} autoFocus>Cancel</Button>
                  <Button onClick={() => {handleDelete(vacation.id)}} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog> */}
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