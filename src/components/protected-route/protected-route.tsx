import { Redirect, Route, RouteProps } from "react-router-dom"
import {FC} from "react";
import {useAppSelector} from "../../hooks/store";

export const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {

  const {loggedIn} = useAppSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
