import axios from "axios";
import { useEffect, useState } from "react";
import { UserModel } from "../../Models/user_model";
import { VacationModel } from "../../Models/vacation_model";
import { Badge, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import LocationOnIcon from '@mui/icons-material/LocationOn';

// TODO: more described properties
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
  const [followers, setFollowers] = useState<any>("");
  
  useEffect(() => {
    axios.get(`http://localhost:3000/vacation/single-followers/${vacation.id}`)
    .then((response) => {
      setFollowers(response.data[0].followers)
    })
  },[]);

// console.log(followers);
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

  const handleFollow = (vacationID:number, vacation_name:string) => {
    axios.post(`http://localhost:3000/user/allVacations/${vacationID}/${isAuth.user_id}/${vacation_name}`);
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
  
  // might return it because when editing a vacation the page wont re-render
  // const handleEdit = () => {
  //   axios.put(`http://localhost:3000/user/allVacations`)
  //   handleCloseEdit();
  // }
    return (
      <Card key={vacation.id} elevation={24} sx={{ backgroundColor:"#303950", height: "55%" , width: {xs: "70%", md: "45%"}, display: "flex",  flexDirection: "column", margin: "1rem", border:"solid 0.5px grey", position:"relative" }}>
        <CardMedia
          component="img"
          alt="vacation image"
          height="340"
          image={`http://localhost:3000/${vacation.imageName}`}
        />
        <CardHeader
          title={<Chip icon={<LocationOnIcon color="error"/>} label={vacation.location} sx={{ backgroundColor:"grey", fontSize:"1rem", color:"white"  }} />}
          subheader={<Typography sx={{ color:"grey" }}>{["available between : " + vacation.date_from.toLocaleString().split("T")[0] + " - " +  vacation.date_to.toLocaleString().split("T")[0]]}</Typography>}
          sx={{ color:"white", textAlign:"left"}}
        />
          <Typography gutterBottom variant="body2" color="text.secondary"  sx={{ color:"white" }}>
            {vacation.information}
          </Typography>

        <CardContent sx={{ textAlign:"left" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ color:"white" }}>
            {vacation.price + "$"}
          </Typography>
          <Badge badgeContent={followers} color="primary">
            <Chip label="followers" sx={{ color:"white"  }} />
          </Badge>
        </CardContent>
        
        <CardActions sx={{ position:"absolute", right:"2px", bottom:"2px" }}>
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
                vacation_id={vacation.id}
                state={openEdit}
                handleOpen={handleClickOpenEdit}
                handleClose={handleCloseEdit}
                id={0}
                information={vacation.information}
                location={vacation.location}
                image={vacation.image}
                imageName={vacation.imageName}
                date_from={vacation.date_from}
                date_to={vacation.date_to}
                price={vacation.price}
                user_id={vacation.user_id} 
                prevImageName={""}/>
            </Box>
            : 
            // ________User Section________
              <Button 
                size="small" 
                color={vacation.user_id !== null ? "error" : "success"}
                variant={vacation.user_id !== null ? "contained" : "outlined"}
                onClick={vacation.user_id !== null ? () => {handleUnFollow(vacation.id)} : () => {handleFollow(vacation.id,vacation.location)}}> 
                {vacation.user_id !== null ? "unFollow" : "Follow"}
              </Button>
          }
        </CardActions>
      </Card>
    );
}