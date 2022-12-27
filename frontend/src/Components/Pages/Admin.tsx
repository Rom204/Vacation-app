// REACT IMPORTS 
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// DIFFERENT IMPORTS
import axios from 'axios';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// MUI IMPORTS
import { Box, Button, Card, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { TextField } from '@mui/joy';
// MY IMPORTS
import { VacationModel } from '../../Models/vacation_model';

export const Admin = () => {
    const navigation = useNavigate();
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [vacations, setVacations] = useState([])

    useEffect(() => {
      axios.get("http://localhost:3000/vacation/all")
      .then((response) => {
          // console.log(response.data);
          setVacations(response.data);
      })
    }, []);
    // console.log(vacations);
    const { register, handleSubmit } = useForm<VacationModel>({
        defaultValues : 
        {
            id : 0,
            information : "",
            location: "",
            image : "",
            date_from: new Date(),
            date_to : new Date(),
            price : 0
        }
    });

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const checkValid  = async (newVacation : VacationModel)  => {
        console.log(file);
        newVacation.image = file;
        console.log(newVacation);
        axios.post("http://localhost:3000/vacation/add", newVacation, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => navigation("/user/vacations"))
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const Data = vacations.map((item) => {
      return {
        name: item["vacation_name"],
        followers: item["followers"]
      }
    })
    
return (
    <Box sx={{ height: "90vh", display:"flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
        <Button onClick={handleClickOpen} sx={{ marginBottom : "1rem", height: "4rem", width: "5rem"}}  type="submit" variant="contained" color="info">Add new vacation</Button>
        <Card elevation={24} sx={{ backgroundColor: "whitesmoke", height: "75%" , width: {xs: "100%", md: "95%"}, display: "flex",  flexDirection: "column", alignItems: "center" }}>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Lets add a new vacation !"}
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit((data) => {
                  console.log(data);
                  checkValid(data)
                })}>
                  <TextField type="text" label="information" autoComplete="off" placeholder="information"
                    {...register("information")}
                  />
                  <TextField type="text" label="location" autoComplete="off" placeholder="location"
                    {...register("location")}
                  />
                  <input type="file" onChange={handleFile} name="sampleFile"  />
                  <TextField type="date" label="from" autoComplete="off" placeholder="from"
                    {...register("date_from")}
                  />
                  <TextField type="date" label="until" autoComplete="off" placeholder="until"
                    {...register("date_to")}
                  />
                  <TextField type="number" label="price" autoComplete="off" placeholder="price"
                    {...register("price")}
                  />
                  <Button sx={{ marginBottom : "1rem", height: "4rem", width: "5rem"}}  type="submit" variant="contained" color="info">add</Button>
                </form>
              </DialogContent>
            </Dialog>

            <ResponsiveContainer width="90%" height="90%">
              <BarChart width={150} height={40} data={Data}>
                <XAxis dataKey="name" label={{ fontWeight:"600", value: 'vacations', position: 'insideBottomRight',offset:-5}}/>
                <YAxis label={{ fontWeight:"600", value: 'followers count', angle: -90 }}/>
                <Tooltip/>
                <Bar dataKey="followers" fill="#8884d8" label={{ stroke:"green", fontWeight:"600", position: 'top' }} />
              </BarChart>
            </ResponsiveContainer>
        </Card>
    </Box>
  )
}