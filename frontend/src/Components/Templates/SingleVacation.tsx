import axios from "axios";
import { useState } from "react";
import { UserModel } from "../../Models/user_model";
import { VacationModel } from "../../Models/vacation_model";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface props extends VacationModel {
  
}
interface iprops extends UserModel {
  filter: (id:number) => void;
}


export default function SingleVacation (vacation : props & iprops) {
    console.log(vacation);
    const [vacations, setVacations] = useState<props | iprops>()
    // setVacations(vacation)
    const [open, setOpen] = useState(false);
    const [isFollowed, setIsFollowed] = useState(0);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const handleFollow = (vacationID:number) => {
        console.log(vacationID, vacation.id)
        axios.post(`http://localhost:3000/user/allVacations/${vacationID}/${vacation.id}`);
      };
  
      const handleUnFollow = (vacationID:number) => {
        axios.delete(`http://localhost:3000/user/allVacationsDelete/${vacationID}/${vacation.user_id}`);
      };
  
      const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3000/vacation/delete/${id}`);
        // setVacations(vacations.filter((vacation) => vacation.id!== id));
        vacation.filter(id);
        handleClose()
      };

    return (
      <Card key={vacation.id} elevation={24} sx={{ backgroundColor: "whitesmoke", height: "55%" , width: {xs: "70%", md: "25%"}, display: "flex",  flexDirection: "column", alignItems: "center", margin: "1rem" }}>
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
          <CardActions sx={{  }}>
            {vacation.user_role === "admin" ?
              <div>
                <Tooltip title="Delete vacation post">
                  <IconButton onClick={handleClickOpen}>
                    <DeleteIcon color="error"  />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={open}
                  onClose={handleClose}
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
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                    <Button onClick={() => {handleDelete(vacation.id)}} color="error">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
                
                <Tooltip title="Edit vacation post">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
              : 
                <Button 
                  size="small" 
                  color={vacation.user_id !== null ?
                  "error" 
                  :
                  "success"
                  }
                  variant={vacation.user_id !== null ?
                  "contained" 
                  :
                  "outlined"
                  }
                  onClick={vacation.user_id !== null  ?
                        () => {handleUnFollow(vacation.id)}
                        :
                        () => {handleFollow(vacation.id)}}> 
                  {vacation.user_id !== null ? "unFollow" : "Follow"}
                </Button>
            }
          </CardActions>
      </Card>
    );
}