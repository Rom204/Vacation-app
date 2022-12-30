import { store } from "../../Redux/store";

const Validations_Service = {

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