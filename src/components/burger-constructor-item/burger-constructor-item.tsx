import styles from './burger-constructor-item.module.css'
import {useDispatch} from "react-redux";
import React, {useRef} from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from 'react-dnd';
import {moveIngredient, deleteIngredient} from "../../services/slice/constructor-slice";


const BurgerConstructorItem = ({ item, type, isLocked, index}) => {

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
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      // @ts-ignore
      const dragIndex = item.index;
      // @ts-ignore
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
      // @ts-ignore
      dispatch(moveIngredient({drag: dragIndex, hover: hoverIndex }))
      //@ts-ignore
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.2 : 1;

  dragRef(dropRef(ref));

  return (
    <li className={styles.cart__item} ref={ref} draggable style={{ opacity }} data-handler-id={handlerId}>
      <span className={styles.drag_icon}>
        <DragIcon type="primary"/>
      </span>
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>  dispatch(deleteIngredient(item.id))}
      />
    </li>
  )
}

export default BurgerConstructorItem

BurgerConstructorItem.propTypes ={
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  type: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
  index: PropTypes.number
}
