import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface DialogProps { 
    vacation_id: number;
    state: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleDelete: (id: number) => void;
}

const DeleteDialog = ({ vacation_id, state, handleOpen, handleClose, handleDelete }: DialogProps) =>  {
    return (
      <div>
        <Tooltip title="Delete vacation post">
          <IconButton onClick={handleOpen}>
            <DeleteIcon sx={{ color:"whiteSmoke", ":hover":{color:"red"} }}  />
          </IconButton>
        </Tooltip>
        <Dialog
          open={state}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this vacation?"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting this post means you or any other user within this application will no longer be 
              able to see it never again.
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Cancel</Button>
            <Button onClick={() => {handleDelete(vacation_id)}} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}
export default DeleteDialog