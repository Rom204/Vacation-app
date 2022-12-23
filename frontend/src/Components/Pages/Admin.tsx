import { TextField } from '@mui/joy';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { VacationModel } from '../../Models/vacation_model';
import { store } from '../../Redux/store';
import Validations_Service from '../Services/Validations_Service';

export const Admin = () => {
    const navigation = useNavigate();
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
      axios.get("http://localhost:3000/vacation/all")
      .then((response) => {
          setVacations(response.data);
      })
    }, []);

    const { register, handleSubmit, watch, formState : { errors } } = useForm<VacationModel>({
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
        }).then(() => navigation("/vacations"))
    }
    // console.log(file);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const Data = vacations.map((item) => {
      return {
        name: item.location,
        uv: item.price
      }
    })
    const data = [
      {
        name: 'Page A',
        uv: 1000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 2000,
        pv: 1398,
        amt: 2210,
      },
      
    ];
return (
    <Box sx={{  height: "100%", display:"flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap", backgroundImage: "linear-gradient(to right, #403a3e, #be5869)" }}>
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
                <Button  sx={{ marginBottom : "1rem", height: "4rem", width: "5rem"}}  type="submit" variant="contained" color="info">add</Button>
            </form>
              </DialogContent>
            </Dialog>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={Data}>
                <Bar dataKey="uv" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
        </Card>
    </Box>
  )
}

