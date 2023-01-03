import { useEffect } from 'react';
import Header from './Components/Layout/Header';
import Main from './Components/Layout/Main';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { login } from './Redux/features/user/userSlice';
import { authAxiosInstance } from './utils/api';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user);
  useEffect(() => { 
    if (isAuth.username.length > 0) {
      return
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        authAxiosInstance(token)
        .post("/checkToken")
        .then(response => dispatch(login(response.data)))
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
