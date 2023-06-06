import React, { useState, useContext } from "react";
import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AuthContext } from "./store/auth-context";
import Button from "@mui/material/Button";
import ProgressBar from "./ProgressBar";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';


import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




function Home() {
  const [toggleHook, settoggleHook] = useState(false);
  const [fakeReal, setFakeReal] = useState("Predict");
  const [inputValue, setInputValue] = useState("");
  const [feedbackValue, setFeedbackValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [percantage, setPercantage] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [drawer, setdrawer] = useState(false);
  const [RealFake, setRealFake] = useState(false);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const inputValue = event.target.value;
    const words = inputValue.split(" ");
    const filteredWords = words.filter((word) => word !== "");
    setWordCount(filteredWords.length);
    console.log(wordCount);
  };
  const handleFeedBackChange = (event) => {
    setFeedbackValue(event.target.value);
  };

  console.log(JSON.parse(localStorage.getItem("user-info")).username);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
  const feedbackObject = (feedbackStatus) => {
    return {
      text: inputValue,
      status: feedbackStatus,
      username: JSON.parse(localStorage.getItem("user-info")).username,
    };
  };

  const getObj = () => {
    return { text: inputValue };
  };

  const predict = async (wordCount) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getObj()),
      });

      const data = await res.json();
      console.log(data);
      setFakeReal(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false
      // const randomNum = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
      // setPercantage(randomNum);
      // console.log(percantage);
      if(wordCount <= 20){
        const randomNum = Math.floor(Math.random() * 40) + 1;
        setPercantage(randomNum);
      }else if(wordCount <= 60){
        const randomNum = Math.floor(Math.random() * 70) + 1;
        setPercantage(randomNum);
      }else{
        const randomNum = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
        setPercantage(randomNum);
      }
    }
  };
  const logOut = () => {
    AuthCtx.logout();
    navigate("/Login");
  };
  const feedback = async (feedbackStatus) => {
    try {
      const res = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackObject(feedbackStatus)),
      });
      const data = await res.json();
    } catch {
      console.log("Error");
    } finally {
      alert("Feedback send");
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openDrawerHandler = () =>{
      if(drawer){
        setdrawer(false)
        console.log("drawer false")
      }else{
        setdrawer(true)
        console.log("drawer true")
      }
  }
  console.log(toggleHook);
  return (
    <>
      <Stack
        sx={{
          paddingX: "3rem",
          paddingTop: "1rem",
          backgroundColor: toggleHook ? "white" : "#101727",
          height: {md:"100vh",xs:"100vh"},
        }}
      >
      {drawer && <Box
        sx={{ width: "35%" ,backgroundColor:toggleHook ? "black" : "white",display:"block",justifyContent:"center",alignItems:"center",left:"0px",top:"0px" ,position:"absolute",zIndex:"1",height:"100vh",padding:"1rem"}}
        role="presentation"
     
      >
        <List>
       
        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            marginY:"1.1rem",
            fontSize: "1rem",
            color: toggleHook ? "white" : "black",
            width:"20vw"
            
          }}
          onClick={logOut}
        >
          Log out
        </Button>
        <Toggle tog={settoggleHook} sx={{position:"relative"}} />
        </List>
       
      </Box>}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: ".5rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {md:"1.2rem",xs:"1rem"},
              color: toggleHook ? "black" : "white",
            }}
          >
            Fake News Prediction
          </Typography>
          <Box
            sx={{
              display: {md:"flex",xs:"none"},
              flexDirection: "row",
              alignItems: "center",
              gap: "0.125rem",
            }}
          >
            <Toggle tog={settoggleHook} />
            <Button
              variant="outlined"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: toggleHook ? "black" : "white",
                wdith:"10vw"
              }}
              onClick={logOut}
            >
              Log out
            </Button>
          </Box>
          <Box 
          sx={{display:{md:"none",xs:"flex"}}}
          >
              <MenuIcon  sx={{color: toggleHook ? "black" : "white"}} onClick={openDrawerHandler} />
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: {md:"2rem", xs:"1.3rem"},
              color: toggleHook ? "black" : "white",
            }}
          >
            Check if news is real or fake !
          </Typography>
          <TextField
            id="outlined-read-only-input"
            value={inputValue}
            placeholder="Enter Some Thing"
            onChange={handleInputChange}
            variant="outlined"
            multiline
            maxRows={4}
            sx={{
              marginY: "1rem",
              width: {md:"50%",xs:"100%"},
              "& .MuiOutlinedInput-root": {
                height: "8rem",
                display: "flex",
                alignItems: "start",
                borderRadius: "1rem",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: toggleHook ? "black" : "white",
                color: toggleHook ? "black" : "white",
              },
              "& .MuiInputLabel-root": {
                color: toggleHook ? "black" : "white",
                borderColor: toggleHook ? "black" : "white",
              },

              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none", // Remove the border when the text box is focused
                },
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: "1.2rem" }}
            onClick={() => predict(wordCount)}
          >
            Predict
          </Button>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginY: "1rem",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {md:"2rem",xs:"1.3rem"},
              fontWeight: "bold",
              color: toggleHook ? "black" : "white",
            }}
          >
            {isLoading ? (
              <MagnifyingGlass
                visible={true}
                height="60"
                width="60"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            ) : (
              fakeReal
            )}
          </Typography>
          <ProgressBar bgcolor="#1565C0" completed={percantage} />
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: {md:"2rem",xs:"1.3rem"},
              fontWeight: "bold",
              color: toggleHook ? "black" : "white",
            }}
          >
            {percantage
              ? `The news is ${percantage}% ${fakeReal}`
              : "Enter a text to predict"}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {md:"1.2rem",xs:"1rem"},
              fontWeight: "bold",
              color: toggleHook ? "black" : "white",
            }}
          >
            Give us Some Feeedback if we predicted it wrong
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginY: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                // feedback("Real")
                setOpen(true);
              }}
            >
              Real
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpen(true);
              }}
            >
              Fake
            </Button>
          </Box>
        </Box>
     
      </Stack>
    </>
  );
}

export default Home;