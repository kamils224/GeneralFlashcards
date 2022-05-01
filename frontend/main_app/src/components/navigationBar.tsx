import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "redux-store/hooks";
import {selectIsAuthenticated} from "redux-store/selectors/authSelectors";
import {removeAuthData} from "redux-store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "routes/routeNames";

export const NavigationBar: React.FC<React.ReactNode> = () => {
  const titleStyle = {textShadow: "1px 1px black"};
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(removeAuthData());
    navigate(RouteNames.login, {replace: true});
  };

  return <AppBar position="sticky" sx={{boxShadow: 3}}>
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Typography color="secondary" variant="h4" component="div"
          sx={{fontWeight: "bold"}}>
          <span style={titleStyle}>Flashcards</span>
        </Typography>
        <Typography sx={{fontWeight: "bold"}} color="secondary" variant="h5" component="div">
          <span style={titleStyle}>for general purpose</span>
        </Typography>
      </Box>
      {isAuthenticated && <Button onClick={logOut}
        size="large" color="secondary" variant="contained">Log out</Button>}
    </Toolbar>
  </AppBar>;
};
