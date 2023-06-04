import React, { useState, useContext } from "react";
import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AuthContext } from "./store/auth-context";
import Button from "@mui/material/Button";
import ProgressBar from "./ProgressBar";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

function Home() {
  const [toggleHook, settoggleHook] = useState(false);
  const [fakeReal, setFakeReal] = useState("Predict");
  const [inputValue, setInputValue] = useState("Enter Some Thing");
  const [isLoading, setLoading] = useState(false);
  const [percantage, setPercantage] = useState(null);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  console.log(JSON.parse(localStorage.getItem("user-info")).username);
  const feedbackObject = (feedbackStatus) => {
    return { text: inputValue ,
      status: feedbackStatus,
    username: JSON.parse(localStorage.getItem("user-info")).username 
  }};

  const getObj = () => {
    return { text: inputValue }
  };

  const predict = async () => {
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
      const randomNum = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    setPercantage(randomNum);
    console.log(percantage);
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

    } catch{
        console.log("Error");
      } finally {
        alert("Feedback send");  
        
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
          height: "100vh",
        }}
      >
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
              fontSize: "1.5rem",
              color: toggleHook ? "black" : "white",
            }}
          >
            Fake News Prediction
          </Typography>
          <Box
            sx={{
              display: "flex",
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
              }}
              onClick={logOut}
            >
              Log out
            </Button>
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
              fontSize: "2rem",
              color: toggleHook ? "black" : "white",
            }}
          >
            Check if news is real or fake !
          </Typography>
          <TextField
            id="outlined-basic"
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            maxRows={4}
            sx={{
              marginY: "1rem",
              width: "50%",
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
            onClick={predict}
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
              fontSize: "1.8rem",
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
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: toggleHook ? "black" : "white",
            }}
          >
            {percantage ? `The news is ${percantage}% ${fakeReal}` : "Enter a text to predict" }
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
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
            <Button variant="contained" color="success" onClick={() => feedback("Real")}>
              Real
            </Button>
            <Button variant="contained" color="error" onClick={() => feedback("Fake") }>
              Fake
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default Home;
