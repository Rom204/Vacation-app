import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserModel } from "../../Models/user_model";
import { VacationModel } from "../../Models/vacation_model";
import { store } from "../../Redux/store";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Validations_Service from "../Services/Validations_Service";
import SingleVacation from "../Templates/SingleVacation";

function Vacations(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [isFollowed, setIsFollowed] = useState(0);
    const [vacationsID, setVacationsID] = useState([]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

    useEffect(() => {
        if (user) {
          axios.get(`http://localhost:3000/user/vacationsID/${user?.user_id}`)
          .then((response) => {
              let result = response.data;
              if (page === 1) {
                let slice = result.splice(page-1, 5);
                setVacations(slice);
              } else if (page > 1) {
                let slice = result.splice(((page-1) * 5) + 1 ,(page * 5) + 1 )
                setVacations(slice);
              }
          })
        } else {
          // Validations_Service.ValidationByJWT();
          // setUser(store.getState().userState.user);
        }
          // console.log(user?.username)
    }, [page, user,isFollowed]);
    console.log("vacations", vacations);
    // console.log("user", user);
    // useEffect(() => {
    //   checkFollowedVacations();
    // }, [user,isFollowed]);

    // const checkFollowedVacations = () => {
    //   console.log("check it" , user);
    //   if (user?.id !== undefined) {
    //     axios.get(`http://localhost:3000/user/vacationsID/${user?.id}`)
    //     .then((response) => {
    //       let result = response.data;
    //       console.log(response.data);
    //       setVacations(result)
    //     });
    //   }
    // }

    // console.log(user?.username);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // const handleFollow = (vacationID:number, index:number) => {
    //   axios.post(`http://localhost:3000/user/allVacations/${vacationID}/${user?.id}`);
    //   setIsFollowed(index);
    // };

    // const handleUnFollow = (vacationID:number, index:number) => {
    //   axios.delete(`http://localhost:3000/user/allVacationsDelete/${vacationID}/${user?.id}`);
    //   setIsFollowed(999);
    // };

    // const handleDelete = (id: number) => {
    //   axios.delete(`http://localhost:3000/vacation/delete/${id}`);
    //   setVacations(vacations.filter((vacation) => vacation.id!== id));
    //   handleClose()
    // };

    return (
            <Box sx={{   display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", position:"relative",padding:"1rem", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
            {vacations.map((item, index) => {
                return (
                  <SingleVacation key={index} id={item.id} information={item.information} location={item.location} image={item.image} imageName={item.imageName} date_from={item.date_from} date_to={item.date_to} price={item.price} user_id={item.user_id} firstName={""} lastName={""} username={""} Pwd={""} matchedPwd={""} user_role={""}/>
                    // <Card key={item.id} elevation={24} sx={{ backgroundColor: "whitesmoke", height: "55%" , width: {xs: "70%", md: "25%"}, display: "flex",  flexDirection: "column", alignItems: "center", margin: "1rem" }}>
                    //     <CardHeader
                    //       title={item.location}
                    //       subheader={["available between : " + item.date_from.toLocaleString().split("T")[0] + " - " +  item.date_to.toLocaleString().split("T")[0]]}
                    //     />
                    //     <CardMedia
                    //       component="img"
                    //       alt="vacation image"
                    //       height="240"
                    //       image={`http://localhost:3000/${item.imageName}`}
                    //     />
                    //     <CardContent>
                    //       <Typography gutterBottom variant="h5" component="div">
                    //         {item.location}
                    //       </Typography>
                    //       <Typography variant="body2" color="text.secondary">
                    //         {item.information}
                    //       </Typography>
                    //     </CardContent>
                    //     <CardActions sx={{  }}>
                    //       {user?.role === "admin" ?
                    //         <div>
                    //           <Tooltip title="Delete vacation post">
                    //             <IconButton onClick={handleClickOpen}>
                    //               <DeleteIcon color="error"  />
                    //             </IconButton>
                    //           </Tooltip>
                    //           <Dialog
                    //             open={open}
                    //             onClose={handleClose}
                    //             aria-labelledby="alert-dialog-title"
                    //             aria-describedby="alert-dialog-description"
                    //           >
                    //             <DialogTitle id="alert-dialog-title">
                    //               {"Are you sure you want to delete this vacation?"}
                    //             </DialogTitle>
                    //             <DialogContent>
                    //               <DialogContentText id="alert-dialog-description">
                    //                 Deleting this post means you or any other user within this application will no longer be 
                    //                 able to see it never again.
                    //               </DialogContentText>
                    //             </DialogContent>
                    //             <DialogActions>
                    //               <Button onClick={handleClose} autoFocus>Cancel</Button>
                    //               <Button onClick={() => {handleDelete(item.id)}} color="error">
                    //                 Delete
                    //               </Button>
                    //             </DialogActions>
                    //           </Dialog>
                              
                    //           <Tooltip title="Edit vacation post">
                    //             <IconButton>
                    //               <EditIcon />
                    //             </IconButton>
                    //           </Tooltip>
                    //         </div>
                    //         : 
                    //           <Button 
                    //             size="small" 
                    //             color={item.user_id !== null ?
                    //             "error" 
                    //             :
                    //             "success"
                    //             }
                    //             variant={item.user_id !== null ?
                    //             "contained" 
                    //             :
                    //             "outlined"
                    //             }
                    //             onClick={item.user_id !== null  ?
                    //                   () => {handleUnFollow(item.id, index)}
                    //                   :
                    //                   () => {handleFollow(item.id, index)}}> 
                    //             {item.user_id !== null ? "unFollow" : "Follow"}
                    //           </Button>
                    //       }
                    //     </CardActions>
                    // </Card>
                )
            })}
              <Stack spacing={2} >
                <Pagination sx={{ position: "absolute", bottom: "1px", right:"45%" }} count={10} page={page} onChange={handleChange} />
              </Stack>
            </Box>
    );
};
export default Vacations;