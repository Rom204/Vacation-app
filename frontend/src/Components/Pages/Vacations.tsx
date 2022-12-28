import { Box, Button, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { VacationModel } from "../../Models/vacation_model";

import SingleVacation from "../Templates/SingleVacation";
import { useAppSelector } from "../../hooks";

function Vacations(): JSX.Element {

    const isAuth = useAppSelector((state) => state.user);
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

    useEffect(() => {
        if (isAuth) {
          console.log(isAuth.user_id)
          axios.get(`http://localhost:3000/user/vacationsID/${isAuth.user_id}`)
          .then((response) => {
              setVacations(response.data)
          })
        } else {
          console.log("error no user connected to vacations page")
        }
    }, [isFollowed,isAuth]);
    
    const filter = () => {
      let newData = vacations.filter((vacation)=> vacation.user_id !== null)
      setVacations(newData)
    }
  
    const deleteHandler = (id : number) => {
      setVacations(vacations.filter((vacation) => vacation.id!== id));
    } 

    const handleFollowing = () => {
      setIsFollowed(!isFollowed);
    }
    
    return (
      <Box sx={{ height:{xs:"100%"}, justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", position:"relative",padding:"1rem", backgroundColor:"#303950" }}>
        <Box sx={{ border: "1px solid black", display:"flex", borderRadius:"5px", width:"50%", marginLeft:"25%"}}>
          <Button onClick={filter}>what i follow</Button>
          <Stack spacing={2} >
            <Pagination  count={10} page={page} onChange={handleChange} color="standard" />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>

        {vacations.slice(((page-1 ) * 10), (page -1) * 10 + 10).map((item, index) => {
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
                following={handleFollowing} 
                prevImageName={""}
                />
            )
        })}
        </Box>
      </Box>
    );
};
export default Vacations;