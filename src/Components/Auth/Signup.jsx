import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import "./Signup.css";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [error, setError] = useState("");
  const [policy, setPolicy] = useState(false);

  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const signupReducer = (state, action) => {
    switch (action.type) {
      case "input":
        return {
          ...state,
          [action.name]: action.value,
        };
      default:
        return state;
    }
  };
  const [inputState, dispatch] = useReducer(signupReducer, {
    name: "",
    username: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    dispatch({
      type: "input",
      name: event.target.name,
      value: event.target.value,
    });
  };
  
  const notify = (status) => {
    if(status === "error") {
    toast.error('UserName Already Exists', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });} else {
      toast.error('Please agree policy to continue', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  
  }

  const navigateToLogin = () => {
    navigate("/login");
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!policy) {
      notify();
      return false;
    }

    console.log(inputState);

    const postUser = async () => {
      const rawResponse = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputState }),
      });
      const data = await rawResponse.json();
      console.log(data);
      if (data.msg) {
        notify("error");
        return 0;
      }

      if (data.token) {
        AuthCtx.login(data.token);
        navigate("/");
      }
    };
    postUser();
  };
  const onChangePolicy = (e) => {
    setPolicy(e.target.checked);
  };

  return (
    <>
     <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <Stack
      sx={{
        height: "100vh",
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid
        container
        className="boxShadow"
        sx={{
          height: "80vh",
          width: "80vw",
          backgroundColor: "white",
          borderRadius: "2rem",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              marginY: "2rem",
              fontWeight: "700",
              fontSize: { md: "2rem", xs: "1.2rem" },
              color: "#101727",
            }}
          >
            Create new account
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginY: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AccountCircle sx={{ mr: 1, my: 0.5, color: "#101727" }} />
            <TextField
              sx={{ color: "#101727", width: "55%" }}
              variant="standard"
              placeholder="Username"
              onChange={onChangeHandler}
                name="username"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginY: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AccountCircle sx={{ mr: 1, my: 0.5, color: "#101727" }} />
            <TextField
              sx={{ color: "#101727", width: "55%" }}
              variant="standard"
              placeholder="Name"
              onChange={onChangeHandler}
                name="name"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginY: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <AccountCircle sx={{ mr: 1, my: 0.5, color: "#101727" }} />
            <TextField
              variant="standard"
              placeholder="password"
              onChange={onChangeHandler}
                name="password"
              sx={{ width: "55%" }}
            />
          </Box>
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <Checkbox sx={{ padding: "0px" }} required onChange={onChangePolicy} />
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
                color: "#101727",
              }}
            >
              I Agree Term & Policy
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            // className="gradient"
            sx={{
              marginY: "1rem",
              width: "45%",
              borderRadius: "1.5rem",
              backgroundColor: "#101727",
              fontWeight: "700",
            }}
          >
            CREATE ACCOUNT
          </Button>
        </Grid>
        <Grid
          item
          md={6}
          // className="gradient"
          sx={{
            width: "100%",
            height: {sx:"50%", md:"100%"},
            backgroundColor: "#101727",
            borderRadius: "2rem",

            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: { md: "100%", xs: "auto" },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", color: "white", textAlign: "center",  fontSize: {
                sx: "1rem",
                md: "3rem"
              }}}
            >
              ALREADY HAVE AN ACCOUNT ?
            </Typography>

            <Button
              variant="outlined"
              sx={{
                marginY: "0.5rem",
                width: { lg: "40%", md: "50%", xs: "50%" },
                borderRadius: "2.4rem",
                backgroundColor: "#101727",
                fontWeight: "700",
                color: "white",
                borderColor: "white",
              }}
              onClick={navigateToLogin}
            >
              LOG IN
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Stack>
    </>
  );
};

export default Signup;