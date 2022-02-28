import styles from './burger-constructor-item.module.css'
import {useDispatch} from "react-redux";
import React, {useRef} from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from 'react-dnd';
import {
  moveIngredient,
} from "../../services/slice/constructor-slice";


const BurgerConstructorItem = ({ item, type, isLocked, id, index, constructor}) => {

  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor",
    item: () => {
      return { item, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, dropRef] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item) {
      //onDropHandler(item);
      //@ts-ignore
      // const ihover = index;
      // if(idrag==ihover) return;
      // // dispatch({type:CHANGE_SORT, drag:idrag, hover:ihover});
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      // @ts-ignore
      const dragIndex = item.index;
      // @ts-ignore
      const dragId = item.id;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;

      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // @ts-ignore
      const ingredientsNew = [...constructor]
      // @ts-ignore
      ingredientsNew.splice(dragIndex, 0, ingredientsNew.splice(hoverIndex, 1)[0])
      console.log(ingredientsNew)
      dispatch(moveIngredient(ingredientsNew))
      //@ts-ignore
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.2 : 1;

  dragRef(dropRef(ref));

  return (
    // @ts-ignore
    <li className={styles.cart__item} key={item._id} ref={ref} draggable style={{ opacity }} data-handler-id={handlerId}>
      {/*// @ts-ignore*/}
      <span className={styles.drag_icon}>
        <DragIcon type="primary"/>
      </span>
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  )
}

export default BurgerConstructorItem
