import { Redirect, Route } from 'react-router-dom';
import {RootStateOrAny, useSelector} from "react-redux";

export function ProtectedRoute({ children, ...rest }) {

  const {loggedIn} = useSelector((state:RootStateOrAny) => state.auth);

  // if (!loggedIn) {
  //   return null;
  // }

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
