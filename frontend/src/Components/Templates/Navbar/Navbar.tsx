// REACT REDUX IMPORTS
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../../hooks"

// MUI IMPORTS 
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

// FONTS & ICONS IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// MY IMPORTS
import "./Navbar.css"
import { logout } from '../../../Redux/features/user/userSlice';


export default function Navbar() {
  
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user);

  const navigate = useNavigate()
  
  const logoutHandler = () => { 
      handleClose()
      dispatch(logout());
      localStorage.removeItem('token');
      navigate("/login")
  }

  const navigation = [
    { name: "Vacations", path: "/user/vacations", icon: faMagnifyingGlass },
    { name: "follow", path: "/user/follow", icon: faMapLocationDot }, 
  ] 

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [el, setEl] = useState<null | HTMLElement>(null);
  const menu = Boolean(el);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 , backgroundColor: "antiquewhite"}}>
      <AppBar position="static" sx={{ backgroundColor: "#505771", borderBottom: "2px solid rgba(51,51,51,.25)", fontFamily:"'FF Mark W05',Arial,sans-serif" }}>
        <Toolbar>
        <NavLink to={"/"} className="LOGO">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 , backgroundImage:"../../../../Assets/icons8-vacation-64.png"}}
          >
            
            <FontAwesomeIcon icon={faMapLocationDot}/>
            Travel
          </IconButton>
          </NavLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.2 }}/>
          {navigation.map((item) => {
            return (
              <NavLink 
                key={item.name}
                to={item.path} 
                className="NavLink">
                <Button color="inherit" sx={{ display: {xs : "none", md: "block"}, padding:"0.5rem 1.5rem 0.5rem 1.5rem", fontWeight:"600" , ":hover": {backgroundColor:"#5e5959", borderBottom: "5px solid #2596be" } , transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
                  {item.name}
                </Button>
              </NavLink>)
          })}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          {isAuth?.user_role === "admin" ? 
            <NavLink 
              key={"admin"}
              to={"/user/admin"} 
              className="NavLink">
              <Button sx={{ display: {xs: "none", md: "block"} }} color="inherit">admin</Button>
            </NavLink> :
            ""
            }
          {isAuth.username.length > 0 ? (
            <div>
            <Tooltip title={<h3>{isAuth.username}</h3>}>
            <IconButton 
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ display: {xs: "none", md: "block"} }} 
              color="inherit" 
              onClick={handleClick}>
                <AccountCircleIcon/>
            </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem disabled sx={{ color: "blue", fontWeight:'600' }}>hello {isAuth.username}</MenuItem>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
            </div>
          ) : (
            <NavLink 
                key={"login"}
                to={"/login"} 
                className="NavLink">
                <Button sx={{ display: {xs: "none", md: "block"} }} color="inherit">login</Button>
              </NavLink>
          )}
          <Button  
            sx={{ display: {xs: "block", md: "none"}, color: "white"}}
            aria-controls={menu ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menu ? 'true' : undefined}
            color="inherit" 
            onClick={handleMenuClick}>
            <MenuIcon sx={{fontSize: "36px" }}/>
            </Button>
            <Menu
              id="menu"
              anchorEl={el}
              open={menu}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'button',
              }}
              
            >
              <MenuItem disabled sx={{ color: "blue", fontWeight:'600' }}>MENU</MenuItem>
              {navigation.map((item) => {
                return (
                  <NavLink 
                    key={item.name}
                    to={item.path} 
                    className="NavLink">
                  <MenuItem 
                    onClick={handleMenuClose}
                    sx={{ color:"black" }} >
                      {item.name}
                  </MenuItem>
                  </NavLink>
                  )
                  })}
            </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}