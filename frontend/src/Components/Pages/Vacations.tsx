import { Box, Button, Menu, MenuItem, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { VacationModel } from "../../Models/vacation_model";

import SingleVacation from "../Templates/SingleVacation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setVacation } from "../../Redux/features/vacation/vacationSlice";
import { getVacations } from "../../utils/api";

function Vacations(): JSX.Element {
  const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.user);
    const vacationState = useAppSelector((state) => state.vacation);
    const [original, setOriginal] = useState<VacationModel[]>([])
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  console.log("vacation state :", vacationState);
    useEffect(() => {
        if (isAuth) {
          console.log(isAuth.user_id)
          getVacations(`/vacationsID/${isAuth.user_id}`)
          .then((response) => {
            console.log("new response:",response)
            dispatch(setVacation(response.data))
            setVacations(response.data)
            setOriginal(response.data)
          })
        } else {
          console.log("error no user connected to vacations page")
        }
    }, [isFollowed,isAuth]);
    
    const filter = () => {
      let newData = vacations.filter((vacation)=> vacation.user_id !== null)
      setVacations(newData)
      setAnchorEl(null);
      setPage(1)
    }

    const allFilter = () => {
      setVacations(original);
      setAnchorEl(null);
      setPage(1);
    };
  
    const deleteHandler = (id : number) => {
      setVacations(vacations.filter((vacation) => vacation.id!== id));
    } 

    const handleFollowing = () => {
      setIsFollowed(!isFollowed);
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    return (
      <Box sx={{ height:{xs:"100%"}, justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", position:"relative",padding:"1rem", backgroundColor:"#303950" }}>
        <Button 
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ display: {xs: "block", md: "block"} , backgroundColor:"whitesmoke"}} color="info" onClick={handleClick}>
                Filter By
        </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem disabled sx={{ color: "blue", fontWeight:'600', borderBottom:"1px solid" }}>choose category :</MenuItem>
            <MenuItem onClick={allFilter}>all vacations</MenuItem>
            <MenuItem onClick={filter}>vacations I follow</MenuItem>
            <MenuItem onClick={handleClose}>???</MenuItem>
          </Menu>
          <Box sx={{  display:"flex", justifyContent:"center", borderRadius:"5px", width:"50%", marginLeft:"25%" }}>
            <Stack spacing={2}  >
              <Pagination  count={10} page={page} onChange={handleChange} color="primary" variant="outlined" shape="rounded"  />
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