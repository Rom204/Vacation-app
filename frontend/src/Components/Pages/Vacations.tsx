import { Box, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { VacationModel } from "../../Models/vacation_model";

import SingleVacation from "../Templates/SingleVacation";
import { useAppSelector } from "../../hooks";

function Vacations(): JSX.Element {
    const isAuth = useAppSelector((state) => state.user);
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [followers, setFollowers] = useState<any>([]);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/vacation/all")
    .then((response) => {
        console.log(response.data);
        setFollowers(response.data);
    })
  }, []);
  console.log(followers);
    useEffect(() => {
        if (isAuth) {
          console.log(isAuth.user_id)
          axios.get(`http://localhost:3000/user/vacationsID/${isAuth.user_id}`)
          .then((response) => {
              let result = response.data;
              // console.log(result);
              if (page === 1) {
                let slice = result.splice(page-1, 5);
                setVacations(slice);
              } else if (page > 1) {
                let slice = result.splice(((page-1) * 5) ,(page * 5) + 1 )
                setVacations(slice);
              }
          })
        } else {
          console.log("error no user connected to vacations page")
        }
    }, [page,isFollowed,isAuth]);
    // console.log("vacations", vacations);
  
    const deleteHandler = (id : number) => {
      setVacations(vacations.filter((vacation) => vacation.id!== id));
    } 

    const handleFollowing = () => {
      setIsFollowed(!isFollowed);
    }
    
    return (
      <Box sx={{ height:{xs:"100%", },  display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", position:"relative",padding:"1rem", backgroundColor:"#303950" }}>
        <Box sx={{ border: "1px solid black", display:"block", borderRadius:"5px" }}>
          <Stack spacing={2} >
            <Pagination  count={10} page={page} onChange={handleChange} color="standard" />
          </Stack>
        </Box>
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
                following={handleFollowing} 
                // followers={followers}
                />
            )
        })}
        </Box>
      </Box>
    );
};
export default Vacations;