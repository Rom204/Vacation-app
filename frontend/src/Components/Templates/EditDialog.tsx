import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';


interface DialogProps { 
  vacation_id: number;
  state: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleEdit: () => void;
}

const EditDialog = ({ vacation_id, state, handleOpen, handleClose, handleEdit }: DialogProps) => {
    return ( 
        <div>
            <Tooltip title="Edit vacation post">
                <IconButton onClick={handleOpen}>
                  <EditIcon />
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
                <DialogContent>
    
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>Cancel</Button>
                  <Button onClick={() => {handleEdit()}} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
        </div>
    )
}

export default EditDialog