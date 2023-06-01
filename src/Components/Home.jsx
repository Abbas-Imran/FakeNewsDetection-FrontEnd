import React, { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import ProgressBar from "./ProgressBar";
import Toggle from "./Toggle"

function Home() {

    const [toggleHook,settoggleHook]=useState(false);
    const [inputValue, setInputValue] = useState('Enter Some Thing');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    console.log(toggleHook);
  return (
    <>
      <Stack sx={{ paddingX: "3rem", paddingTop: "1rem" ,backgroundColor:toggleHook ?   "white" : "#101727" }}>
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
              color:toggleHook ?    "black":"white"
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
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color:toggleHook ?    "black":"white"
              }}

            >
              Logout
            </Typography>
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
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem" ,color:toggleHook ?    "black":"white"}}
          >
            Check if news is real or fake !
          </Typography>
          <TextField
            id="outlined-basic"
            
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
              sx={{     
              marginY: "1rem",
              width: "50%",
              "& .MuiOutlinedInput-root": {
                height: "8rem",
                display: "flex",
                alignItems: "start",
                borderRadius: "1rem",
                borderWidth:"1px",
                borderStyle:"solid",
                borderColor:toggleHook ?    "black":"white",
                color:toggleHook ?    "black":"white"
              },
              "& .MuiInputLabel-root": {
                color: toggleHook ? "black" : "white",
                borderColor:toggleHook ?    "black":"white",
              },
              
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: "none", // Remove the border when the text box is focused
              }

            }}
          
          />
          <Button variant="contained" sx={{ borderRadius: "1.2rem" }}>
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
          <Typography sx={{ textAlign: "center", fontSize: "1.8rem" , fontWeight:"bold",color:toggleHook ?    "black":"white"}}>
            FAKE
          </Typography>
          <ProgressBar bgcolor="#1565C0" completed={60} />
          <Typography sx={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "bold",color:toggleHook ?    "black":"white" }}>
            This News is 45% Fake
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" ,color:toggleHook ?    "black":"white" }}>
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
            <Button variant="contained" color="success">
              Real
            </Button>
            <Button variant="contained" color="error">
              Fake
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default Home;
