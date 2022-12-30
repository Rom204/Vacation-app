import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Button, Box } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import { VacationModel } from "../../Models/vacation_model";
import axios from "axios";
import {  useState } from "react";
import { TextField } from "@mui/joy";


interface DialogProps extends VacationModel { 
  vacation_id: number;
  state: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  // handleEdit: () => void;
}

const EditDialog = ({ information, location, image, imageName, prevImageName, date_from, date_to, price, user_id, id, vacation_id, state, handleOpen, handleClose }: DialogProps) => {
  // console.log(vacation_id)
  const [file, setFile] = useState("");
  const { register, handleSubmit } = useForm<VacationModel>({
    defaultValues : 
    {
        id : vacation_id,
        information : information,
        location: location,
        image : imageName,
        prevImageName: imageName,
        date_from: date_from.toLocaleString().split("T")[0],
        date_to : date_to.toLocaleString().split("T")[0],
        price : price
    }
  });

  const handleFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0])
  }

  const checkValid  = async (newVacation : VacationModel)  => {
    // console.log(file);
    newVacation.image = file;
    // console.log(newVacation);
    axios.put("http://localhost:3000/vacation/add", newVacation,
        {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
  }
    return ( 
        <Box>
          <Tooltip title="Edit vacation post">
            <IconButton  onClick={handleOpen}>
              <EditIcon sx={{ color:"whiteSmoke",":hover":{color:"green"} }} />
            </IconButton>
          </Tooltip>
          <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Please make sure that the changes you made are correct"}
            </DialogTitle>
            <DialogContent >
            <form onSubmit={handleSubmit((data) => {
              console.log(data);
              checkValid(data)
            })}>
            <TextField  type="text" label="information" autoComplete="off" placeholder="information"
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
            <Button  sx={{ marginBottom : "1rem", height: "4rem", width: "5rem"}}  type="submit" variant="contained" color="info">edit</Button>
            </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus color="inherit">Cancel</Button>
              {/* <Button onClick={() => {handleEdit()}} color="warning">Edit</Button> */}
            </DialogActions>
          </Dialog>
        </Box>
    )
}
export default EditDialog