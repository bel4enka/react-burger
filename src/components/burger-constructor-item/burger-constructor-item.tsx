import styles from './burger-constructor-item.module.css'
import React, {FC, useRef} from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DropTargetMonitor,
  useDrag,
  useDrop
} from 'react-dnd';
import {moveIngredient, deleteIngredient} from "../../services/slice/constructor-slice";
import {useAppDispatch} from "../../hooks/store";
import {TIngredient} from "../../services/types/data";

interface IBurgerConstructorItemProps {
  item: TIngredient,
  type?: 'top' | 'bottom',
  isLocked: boolean,
  index: number
}

const BurgerConstructorItem:FC<IBurgerConstructorItemProps> = ({ item, isLocked, index}) => {

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const [{isDragging} , drag] = useDrag({
    type: "constructor",
    item: () => {
      return { item, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item: {index: number}, monitor: DropTargetMonitor) => {
      if(!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({drag: dragIndex, hover: hoverIndex }))
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.7 : 1;

  drag(drop(ref));

  return (
    <li className={styles.cart__item} ref={ref} draggable style={{ opacity }} data-handler-id={handlerId}>
      <span className={styles.drag_icon}>
        <DragIcon type="primary"/>
      </span>
      <ConstructorElement
        isLocked={isLocked}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>  dispatch(deleteIngredient(item.id))}
      />
    </li>
  )
}

export default BurgerConstructorItem
