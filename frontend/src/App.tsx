import { useEffect } from 'react';
import Header from './Components/Layout/Header';
import Main from './Components/Layout/Main';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import axios from 'axios';
import { login } from './Redux/features/user/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user);
  useEffect(() => { 
    if (isAuth.username.length > 0) {
      return
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post("http://localhost:3000/user/checkToken")
        .then((response) => {
          dispatch(login(response.data))
        })
      }
    }
  },[]);

  return (
    <Box sx={{ padding: "0px" }}>
      <header>
        <Header/>
      </header>

      <main>
        <Main/>
      </main>
    </Box>
  );
}
export default App;
