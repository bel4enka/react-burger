import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { fetchIngredients, ingredientModal } from "../../services/slice/ingredients-slice";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, NotFound404 } from '../../pages'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {ProtectedRoute} from "../protected-route/protected-route";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);


  const ModalToggle = () => {
 // переписать!!!!
    const location = useLocation();
    const history = useHistory();
    const ingredient = location.state && location.state.ingredient;


    const toggleModal = () => {
      history.goBack();
    };

  return (
    <>
      <AppHeader/>
      <main className={styles.main}>
        <Switch location={ingredient || location}>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path='/ingredients/:id' exact={true}>
            <IngredientDetails />
          </Route>

          <Route exact path="/register">
            <Register/>
          </Route>

          <Route exact path="/forgot-password">
            <ForgotPassword/>
          </Route>

          <Route exact path="/reset-password">
            <ResetPassword/>
          </Route>

          <ProtectedRoute exact path="/profile">
            <Profile/>
          </ProtectedRoute>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route>
            <NotFound404 />
          </Route>

        </Switch>
        {ingredient &&
          <Route path='/ingredients/:id'>
            <Modal onClose={toggleModal} title={'Детали ингредиента'}>
              <IngredientDetails/>
            </Modal>
          </Route>
        }
      </main>
    </>
    );
  }
  return (
    <Router>
      <ModalToggle />
    </Router>
  );
}
export default App
