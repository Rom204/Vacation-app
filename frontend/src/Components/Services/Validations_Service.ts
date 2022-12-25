import axios from "axios";
import { store } from "../../Redux/store";
// import { login } from "../../Redux/userState/action-creators";
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from "../../hooks";
import { login } from "../../Redux/features/user/userSlice";

// const dispatch = useAppDispatch();
const Validations_Service = {
  
  

  ValidationOfUsername: async function (username: string) {
    let valid = false;

    await axios.get("http://localhost:3000/user/all")
    .then(response => response.data.map((item: any) => {
      if (item.username === username) {
        
        valid = false;
        console.log(username + " invalid username");
      } else {
        valid = true;
        console.log(username+ " valid username");
      }
    }))
    return valid;
  },

  ValidationOfAdmin: function (){ 
    return store.getState().user.user_role === "admin" ? true : false;
  },

  ValidationOfUser: function (){
    let check = localStorage.getItem("token");
    if (check) {
      return true;
    }
  }
}

export default Validations_Service