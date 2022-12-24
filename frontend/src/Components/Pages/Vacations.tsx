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
import { useAppDispatch, useAppSelector } from "../../hooks";

function Vacations(): JSX.Element {
    const isAuth = useAppSelector((state) => state.user);
    const [user, setUser] = useState<UserModel>()
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [page, setPage] = useState(1);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

    useEffect(() => {
        if (isAuth) {
          console.log(isAuth.user_id)
          axios.get(`http://localhost:3000/user/vacationsID/${isAuth.user_id}`)
          .then((response) => {
              let result = response.data;
              console.log(result);
              if (page === 1) {
                let slice = result.splice(page-1, 5);
                setVacations(slice);
              } else if (page > 1) {
                let slice = result.splice(((page-1) * 5) + 1 ,(page * 5) + 1 )
                setVacations(slice);
              }
          })
        } else {
          console.log("error no user connected to vacations page")
        }
    }, [page,isFollowed,isAuth]);
    console.log("vacations", vacations);
  

    const deleteHandler = (id : number) => {
      setVacations(vacations.filter((vacation) => vacation.id!== id));
    } 

    const handleFollowing = () => {
      setIsFollowed(!isFollowed);
    }
    
    return (
            <Box sx={{ height:{xs:"100%", },  display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", position:"relative",padding:"1rem", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>
            {vacations.map((item, index) => {
                return (
                  <SingleVacation 
                    key={index}
                    id={item.id}
                    information={item.information}
                    location={item.location}
                    image={item.image}
                    imageName={item.imageName}
                    date_from={item.date_from}
                    date_to={item.date_to}
                    price={item.price}
                    user_id={item.user_id}
                    firstName={""}
                    lastName={""}
                    username={isAuth.username}
                    Pwd={""}
                    matchedPwd={""}
                    user_role={isAuth.user_role}
                    filter={deleteHandler} 
                    following={handleFollowing}/>
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
            </Box>
            <Box sx={{ border: "1px solid black", display:"block" }}>
              {/* <Stack spacing={22} > */}
                <Pagination  count={10} page={page} onChange={handleChange} />
              {/* </Stack> */}
              </Box>
            </Box>
    );
};
export default Vacations;