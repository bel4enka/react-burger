import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { fetchIngredients} from "../../services/slice/ingredients-slice";
import { useDispatch} from 'react-redux';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, NotFound404 } from '../../pages'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {ProtectedRoute} from "../protected-route/protected-route";


function App() {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;


  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);

  const toggleModal = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader/>
      <main className={styles.main}>
        <Switch location={background || location}>

          <Route exact={true} path="/">
            <Home/>
          </Route>

          <Route path="/ingredients/:id" exact={true}>
           <IngredientDetails />
          </Route>

          <Route exact={true} path="/register">
            <Register/>
          </Route>

          <Route exact={true} path="/forgot-password">
            <ForgotPassword/>
          </Route>

          <Route exact={true} path="/reset-password">
            <ResetPassword/>
          </Route>

          <ProtectedRoute exact={true} path="/profile">
            <Profile/>
          </ProtectedRoute>

          <Route exact={true} path="/login">
            <Login/>
          </Route>

          <Route>
            <NotFound404 />
          </Route>

        </Switch>
        {background &&
          <Route path='/ingredients/:id' >
            <Modal onClose={toggleModal} title={'Детали ингредиента'}>
              <IngredientDetails/>
            </Modal>
          </Route>
        }
      </main>
    </>
    );
  }

export default App
