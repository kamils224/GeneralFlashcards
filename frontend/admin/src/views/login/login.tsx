import React from "react";
import {Box, Grid, Stack, TextField} from "@mui/material";
import Colors from "styles/variables.module.scss";
import "./login.scss";


export const LoginView = () => {
    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{minHeight: '100vh'}}>
            <Box sx={{
                backgroundColor: Colors.backgroundWhite,
                minWidth: {md: 500, xs: "100%"},
                minHeight: {md: 500, xs: "100%"},
                border: 3,
            }}>
                <h2 className="header">Flashcards Admin</h2>
                <Stack m={5} justifyContent="center" spacing={2}>
                    <TextField sx={{backgroundColor: Colors.backgroundWhite}} label="Email" variant="outlined"/>
                    <TextField label="Password" variant="outlined"/>
                </Stack>
            </Box>
        </Grid>
    )
}