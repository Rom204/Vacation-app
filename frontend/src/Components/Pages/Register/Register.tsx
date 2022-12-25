// REACT IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// DIFFERENT IMPORTS 
import axios from "axios";
// MUI IMPORTS
import { Button, Card, Typography } from "@mui/material";
import { TextField } from "@mui/joy";
// ICONS & FONTS
import { faCheck, faCircleInfo, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// MY IMPORTS
import { UserModel } from "../../../Models/user_model";
import "./Register.css";
// ________________________________________________________________

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigation = useNavigate();
    const { register, handleSubmit, watch } = useForm<UserModel>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            Pwd: "",
            matchedPwd: "",
        }
    });
    const [username, Pwd, matchedPwd] = watch(["username", "Pwd", "matchedPwd"]);
    
    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);
    
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [PwdFocus, setPwdFocus] = useState(false);

    const [validMatchedPwd, setValidMatchedPwd] = useState(false);
    const [matchedPwdFocus, setMatchedPwdFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(Pwd));
        setValidMatchedPwd(Pwd === matchedPwd);
    }, [Pwd, matchedPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, Pwd, matchedPwd])

    const RegistrationValidation = async (data : UserModel) => {
        if (validName) {
            try { 
                await axios.post("http://localhost:3000/user/add",
                    { 
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        password: data.Pwd
                    }
                )
                setSuccess(true);
            } catch (err:any) {
                if (!err?.response) {
                    setErrMsg("no server response");
                }
                if (err.response?.status === 409) {
                    setErrMsg("username is already taken");
                }
                if (err.response?.status === 500){
                    setErrMsg("we are sorry please come back later");
                }
            } 
        }
    }

    return (
        <div className="Register">
			{ success ?  (
                <Card elevation={24} sx={{ backgroundColor: "ghostwhite", height: "70%" , width: "80%"}}>
                    <h1>Registration Success !</h1>
                    <Button color="info" variant="outlined"  onClick={() => { navigation("/login") }}>
                        Login
                    </Button>
                </Card>
                ) : ( 
                <Card elevation={24} sx={{ backgroundColor: "whitesmoke", height: "70%" , width: {xs: "90%", md: "65%"} , display: "flex",  flexDirection: "column", alignItems: "center" }}>
                    <p className={errMsg.length > 0 ? "errorMsg" : "hide"}>{errMsg}</p>
                    <Typography variant="h3" gutterBottom>Registration</Typography>
                    <form onSubmit={handleSubmit((data) => {
                        RegistrationValidation(data)
                    })}>
                        
                        <TextField
                        sx={{ display: "inline-flex" , height:"1rem" }}
                        type="text"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="first name"
                        {...register("firstName")}
                        />
                        
                        <TextField
                        sx={{  display: "inline-flex", height:"1rem" }}
                        type="text"
                        autoComplete="off"
                        placeholder="last name"
                        {...register("lastName")}
                        />

                        <TextField
                        sx={{ marginTop: "0.5rem", marginBottom: "0.5rem"}}
                        type="text"
                        label="Username"
                        autoComplete="off"
                        placeholder="username"
                        startDecorator={ !validName && username.length > 0 ?
                            <FontAwesomeIcon icon={faCircleNotch} className={!validName ? "error": "hide"}/> : 
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        }
                        helperText={userFocus && username && !validName ?  
                            <span className="instructions">
                                <FontAwesomeIcon icon={faCircleInfo}  />
                                User name must be 4 letters or more
                            </span> : ""}
                        onFocus={() => {setUserFocus(true)}}
                        {...register("username", {onBlur :() => {setUserFocus(false)}})}
                        />

                        <TextField
                        sx={{ marginTop: "0.5rem", marginBottom: "0.5rem"}}
                        type="password"
                        label="Password"
                        autoComplete="off"
                        placeholder="Password"
                        startDecorator={!validPwd && Pwd.length > 0 ?
                            <FontAwesomeIcon icon={faCircleNotch} className={"error"}/> : 
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        }
                        helperText={PwdFocus && Pwd && !validPwd ?  
                            <span className="instructions">
                            <FontAwesomeIcon icon={faCircleInfo}  />
                            8 to 24 characters.
                            Must include uppercase and lowercase letters, a number and a special character.
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> 
                            </span> : ""}
                        onFocus={() => {setPwdFocus(true)}}
                        {...register("Pwd", {onBlur :() => {setPwdFocus(false)}})}
                        />

                        <TextField
                        sx={{ marginTop: "0.5rem"}}
                        type="password"
                        label="Confirmed Password"
                        autoComplete="off"
                        placeholder="Confirm Password"
                        startDecorator={!validMatchedPwd && matchedPwd.length > 0 ?
                            <FontAwesomeIcon icon={faCircleNotch} className={"error"}/> : 
                            <FontAwesomeIcon icon={faCheck} className={validMatchedPwd && validPwd ? "valid" : "hide"} />
                        }
                        helperText={matchedPwdFocus && matchedPwd && !validMatchedPwd ?  
                            <span className="instructions">
                            <FontAwesomeIcon icon={faCircleInfo}  />
                            Needs to match the password above 
                            </span> : ""}
                        onFocus={() => {setMatchedPwdFocus(true)}}
                        {...register("matchedPwd", {onBlur :() => {setMatchedPwdFocus(false)}})}
                        />

                        <Button  sx={{ marginTop : "1rem" }} disabled={validName && validPwd && validMatchedPwd ? false : true}  type="submit" variant="outlined">Submit</Button>
                    </form>
                    <p> Already have an account ? <br/><Button onClick={() => {navigation("/login")}}><strong>login here</strong></Button></p>
                </Card>
            )}
        </div>
    );
}
export default Register;