import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {fetchIngredients} from "../../services/slice/ingredients-slice";
import { useDispatch} from 'react-redux';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);

  return (
      <>
        <AppHeader/>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </main>
      </>
    );
}
export default App
