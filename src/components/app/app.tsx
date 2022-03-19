import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import {
  fetchIngredients,
  ingredientModal
} from "../../services/slice/ingredients-slice";
import { useDispatch} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, NotFound404 } from '../../pages'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);

  return (
    <Router>
      <AppHeader/>
      <main className={styles.main}>
        <Switch>

          <Route exact path="/">
            <Home/>
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

          <Route exact path="/profile">
            <Profile/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route>
            <NotFound404 />
          </Route>

        </Switch>

        {ingredientModal &&
          <Route path='/ingredients/:id'>
            <Modal onClose={ontoggle} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
        }
      </main>
    </Router>
    );
}
export default App
