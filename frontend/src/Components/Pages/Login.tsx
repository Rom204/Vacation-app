import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../hooks"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Card } from "@mui/material";
import { TextField } from "@mui/joy";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import EastIcon from '@mui/icons-material/East';
import { UserModel } from "../../Models/user_model";
// import { login } from "../../Redux/userState/action-creators"
import Validations_Service from "../Services/Validations_Service";
import "./Register/Register.css";
import { RootState } from "../../Redux/store";
import { login } from "../../Redux/features/user/userSlice";
// ________________________________________________________________

function Login(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { register, handleSubmit, watch } = useForm<UserModel>({
        defaultValues : 
        {
            user_id : 0,
            username : "",
            Pwd: ""
        }
    });

    const [username, Pwd] = watch(["username", "Pwd"]);

    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, Pwd])
    
    
    const isAuth = useAppSelector((state) => state.user);
    const loginValidation  = async (data : UserModel)  => {
        if (username && Pwd){
            try {
                await axios.post("http://localhost:3000/user/checkLogin", 
                    {
                    username: data.username,
                    password: data.Pwd
                    }
                )
                .then (response => {
                    console.log(response.data);
                    const token = response.data["AccessToken"];
                    localStorage.setItem("token", token);
                    dispatch(login(response.data));
                    navigation("/");
                })
                console.log("important", isAuth)
                
            } catch (err : any ) { 
                if (!err?.response) {
                    setErrMsg("no server response")
                }
                if (err.response?.status === 404) {
                    setErrMsg("invalid username or password");
                }
            } 
        }
    }

    return (
            <Box sx={{  height: "100%", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
                <Card elevation={24} sx={{ backgroundColor: "whitesmoke", height: "75%" , width: {xs: "90%", md: "65%"}, display: "flex",  flexDirection: "column", alignItems: "center" }}>
                    <p className={errMsg.length > 0 ? "errorMsg" : "hide"}>{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit((data) => {
                        console.log(data);
                        loginValidation(data)
                    })}>
                        <TextField
                        sx={{ marginTop: "1.5rem", marginBottom: "0.5rem"}}
                        type="text"
                        label="Username"
                        autoComplete="off"
                        placeholder="username"
                        startDecorator={<AccountCircleIcon/>}
                        {...register("username")}
                        />

                        <TextField
                        sx={{ marginTop: "0.5rem", marginBottom: "2.5rem"}}
                        type="password"
                        label="Password"
                        autoComplete="off"
                        placeholder="Password"
                        startDecorator={<KeyIcon/>}
                        {...register("Pwd")}
                        />
                        <Button  sx={{ marginBottom : "1rem", height: "4rem", width: "5rem"}} disabled={username.length > 3 && Pwd.length > 7  ? false : true}  type="submit" variant="contained" color="info"><EastIcon/></Button>
                    </form>
                    <p>Don't have an account yet ? <br/><Button onClick={() => {navigation("/register")}}><strong>sign-up now</strong></Button></p>
                </Card>
            </Box>
    )
}
export default Login;