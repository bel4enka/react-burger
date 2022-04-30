import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { fetchIngredients} from "../../services/slice/ingredients-slice";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {
  Login,
  Home,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound404,
  Feed,
  Orders,
  OrderItem,
  IngredientsPage
} from '../../pages'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {ProtectedRoute} from "../protected-route/protected-route";
import {
  fetchUpdateToken,
  getUser
} from "../../services/slice/auth-sclice";



function App() {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const modal = (window.history.state != null) ? (window.history.state.modal || false) : false;
  const refreshToken = localStorage.getItem('refreshToken');
  const {loggedIn} = useSelector((state:RootStateOrAny) => state.auth);

  useEffect(() => {
    dispatch(fetchIngredients())

    if(refreshToken) {
      dispatch(getUser())
      // @ts-ignore
      if(!loggedIn) {
        dispatch(fetchUpdateToken())
        // @ts-ignore
        dispatch(getUser())
      }
    }

  }, []);

  const toggleModal = () => {
    history.goBack();
  };
  return (
    <>
      <AppHeader/>

      <main className={styles.main}>
        <Switch location={background || location }>

          <Route exact={true} path="/">
            <Home/>
          </Route>

          <Route exact={true} path="/ingredients/:id" >
            {!modal &&
              <IngredientsPage />
            }
          </Route>

          <Route exact={true} path="/feed/:id">
            {!modal &&
              <OrderItem/>
            }
          </Route>
          {!modal &&
            <ProtectedRoute exact={true} path="/profile/orders/:id">
              <OrderItem/>
            </ProtectedRoute>
          }

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

          <Route exact={true} path="/feed">
            <Feed/>
          </Route>

          <ProtectedRoute exact={true} path="/profile/orders">
            <Orders/>
          </ProtectedRoute>

          <Route>
            <NotFound404 />
          </Route>

        </Switch>
        {background &&
          <Switch>

          <Route path='/ingredients/:id' >
            <Modal onClose={toggleModal} title={'Детали ингредиента'}>
              <IngredientDetails/>
            </Modal>
          </Route>


          <ProtectedRoute path='/profile/orders/:id' >
            <Modal onClose={toggleModal} title={'Детали заказа'}>
              <OrderItem/>
            </Modal>
          </ProtectedRoute>

            <Route path='/feed/:id' >
              <Modal onClose={toggleModal} title={'Детали заказа'}>
                <OrderItem/>
              </Modal>
            </Route>
          </Switch>
        }
      </main>
    </>
    );
  }

export default App
