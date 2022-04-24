import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {RouteNames} from "routes/routeNames";
import {useAppSelector} from "../redux-store/hooks";
import {selectIsAuthenticated} from "../redux-store/selectors/authSelectors";


function PublicOnlyRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return !isAuthenticated ? <Outlet/> : <Navigate to={RouteNames.dashboard} replace/>;
}

export default PublicOnlyRoute;
