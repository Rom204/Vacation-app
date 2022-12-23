import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Navbar from "../Templates/Navbar/Navbar";

function Header(): JSX.Element {
    // const navigate = useNavigate();
    // const dispatch = useAppDispatch()
    // const isAuth = useAppSelector((state) => state.userState.user);
    // const logoutHandler = () => { 
    //     //dispatch to redux store to remove user and jwt token from local storage
    //       // store.dispatch(logout())
    //       dispatch({ type: "logout" });
    //       // setUser(store.getState().userState.user)
    //       // console.log(user);
    //       localStorage.removeItem('token');
    //       navigate("/login")
    //   }
    return (
        <Navbar />
    );
}

export default Header;