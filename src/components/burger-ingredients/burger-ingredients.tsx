import React, {useState, useRef, FC} from "react";
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem
  from "../burger-ingredient-item/burger-ingredient-item";
import  { ingredientModal} from "../../services/slice/ingredients-slice";
import {useAppDispatch, useAppSelector} from "../../hooks/store";
import {TIngredient} from "../../services/types/data";


const BurgerIngredients:FC = () => {
  const {ingredients} = useAppSelector(state => state.ingredients);
  const dispatch = useAppDispatch();


  const [current, setCurrent] = useState<string>('bun')
  const wrapRef = useRef<HTMLDivElement>(null)
  const bun = useRef<HTMLDivElement | null>(null)
  const main = useRef<HTMLDivElement | null>(null)
  const sauce = useRef<HTMLDivElement | null>(null)

  function click (e: React.SetStateAction<string>, ref: React.MutableRefObject<HTMLDivElement>) {
    setCurrent(e)

  ref.current.scrollIntoView({
        behavior: 'smooth',
      })
  }

  const handleScroll = () => {
    const scrollPosition = wrapRef.current.getBoundingClientRect().top

    const bunTitle = Math.abs(scrollPosition - bun.current.getBoundingClientRect().top)
    const sauceTitle = Math.abs(scrollPosition - sauce.current.getBoundingClientRect().top)
    const mainTitle = Math.abs(scrollPosition - main.current.getBoundingClientRect().top)

    const min = Math.min(bunTitle, sauceTitle, mainTitle);
    if (min === sauceTitle){
      setCurrent('sauce')
    }
    else if(min === mainTitle) {
      setCurrent('main')
    }
    else setCurrent('bun')
    }

  function toggleModal(ingredient:TIngredient) {
    dispatch(ingredientModal(ingredient))
  }
  return (
    <>
  {ingredients &&
    <section className={styles.ingredient}>
      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите
        бургер</h1>
      <div className={styles.tab}>
        <Tab value="bun" active={current === 'bun'}
             onClick={(e) => click(e, bun)}>
          Булки
        </Tab>
        <Tab value="main" active={current === 'main'}
             onClick={(e) => click(e, main)}>
          Начинки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'}
             onClick={(e) => click(e, sauce)}>
          Соусы
        </Tab>
      </div>

      <div ref={wrapRef}
           className={`${styles.wrap_product} custom-scroll mt-10`}
           onScroll={handleScroll}>

        <>
          <section ref={bun} id={"bun"}>
            <h2 className={'text text_type_main-medium'}>Булки</h2>
            <ul className={styles.product__items_list}>

              {ingredients.map((item) => item.type === 'bun' &&
                <li key={item._id} onClick={() => {
                  toggleModal(item)
                }}>
                  <BurgerIngredientItem item={item}/>
                </li>)}
            </ul>
          </section>

          <section ref={main}>
            <h2 className={'text text_type_main-medium mt-10'}>Начинки</h2>
            <ul className={styles.product__items_list}>
              {ingredients.map((item) => item.type === 'main' &&
                <li key={item._id} onClick={() => {
                  toggleModal(item)
                }}>
                  <BurgerIngredientItem item={item}/>
                </li>)}
            </ul>
          </section>

          <section ref={sauce}>
            <h2 className={'text text_type_main-medium mt-10'}>Соусы</h2>
            <ul className={styles.product__items_list}>
              {ingredients.map((item) => item.type === 'sauce' &&
                <li key={item._id} onClick={() => {
                  toggleModal(item)
                }}>
                  <BurgerIngredientItem item={item}/>
                </li>)}
            </ul>
          </section>
        </>
      </div>

    </section>
  }
    </>)
}


export default BurgerIngredients
