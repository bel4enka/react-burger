import React, {useState, useRef, useContext, useEffect} from "react";
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem
  from "../burger-ingredient-item/burger-ingredient-item";
import PropTypes from 'prop-types';
import burgerIngredients from '../../utils/type'
import Modal from "../modal/modal";
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import  { fetchIngredients, ingredientsSetTab, selectors } from "../../services/slice/ingredients-slice";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);


  const bun = useRef(null)
  const main = useRef(null)
  const sauce = useRef(null)

  function click (e, refCur) {
    dispatch(ingredientsSetTab(e))

  refCur.current.scrollIntoView({
        behavior: 'smooth',
      })
  }
  const [isOpen, setIsOpen] = useState(null)
  function toggleModal(item) {
    setIsOpen(item)
  }

  const ingredients = useSelector(selectors.selectAll);
  const current = useSelector( (state:RootStateOrAny) => state.tab);

  return (
        <section className={styles.ingredient}>
          <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>
          <div className={styles.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={(e) => click(e, bun)}>
              Булки
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={(e) => click(e, main)}>
              Соусы
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={(e) => click(e, sauce)}>
              Начинки
            </Tab>
          </div>

          <div className={`${styles.wrap_product} custom-scroll mt-10`}>

            {ingredients &&
            <><section ref={bun} id={"bun"}>
              <h2 className={'text text_type_main-medium'}>Булки</h2>
              <ul className={styles.product__items_list}>

                {ingredients.map((item:any) => item.type === 'bun' && <li key={item._id}  onClick={()=>{toggleModal(item)}} >
                  <BurgerIngredientItem item={item} handler={toggleModal} />
                </li>)}
              </ul>
            </section>

            <section ref={main} >
              <h2 className={'text text_type_main-medium mt-10'}>Соусы</h2>
              <ul className={styles.product__items_list}>
                {ingredients.map((item:any) => item.type === 'main' && <li key={item._id} onClick={()=>{toggleModal(item)}}>
                  <BurgerIngredientItem item={item} handler={toggleModal}/>
                </li>)}
              </ul>
            </section>

            <section ref={sauce}>
              <h2 className={'text text_type_main-medium mt-10'}>Начинки</h2>
              <ul className={styles.product__items_list}>
                {ingredients.map((item:any) => item.type === 'sauce' && <li key={item._id} onClick={()=>{toggleModal(item)}}>
                  <BurgerIngredientItem item={item}  />
                </li>)}
              </ul>
            </section></> }
          </div>
          {isOpen &&

              <Modal onClose={toggleModal} title={'Детали ингредиента'}>
                <IngredientDetails item={isOpen} />
              </Modal>
          }
        </section>
      )
}


export default BurgerIngredients
