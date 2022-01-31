import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'


function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIngredients(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error)
        }
      ).catch((error) => console.log( error ))
  }, [])
  if (error) {
    return <div>Ошибка: {error}</div>;
  } else {
    return (
      <>
        <AppHeader/>
        <main className={`${styles.main}`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor constr={ingredients}/>
        </main>
      </>
    );
  }
}
export default App

