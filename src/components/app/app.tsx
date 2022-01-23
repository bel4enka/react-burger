import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import  {data, cart} from '../../utils/data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';

class App extends React.Component {
  render () {
    return (
      <>
        <AppHeader/>
        <main className={`${styles.main}`}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor constr={cart} />
        </main>
      </>
    )
  }

}
export default App

