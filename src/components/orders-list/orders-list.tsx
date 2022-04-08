import styles from './orders-list.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrdersList = () => {

  return (
    <>
      <a className={styles.item} href='#'>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#13119</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        </div>
        <h2 className={'text text_type_main-medium'}>Death Star Starship Main бургер</h2>
        <span className={'text text_type_main-small'}>Создан</span>
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/sp_1.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/core.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/salad.png'} alt={'ингредиент'}/>
            </li>
          </ul>
          <div className={styles.price}>
            <span className={'text_type_digits-default'}>123</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </a>



      <a className={styles.item} href='#'>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#13119</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        </div>
        <h2 className={'text text_type_main-medium'}>Death Star Starship Main бургер</h2>
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/sp_1.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/core.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/salad.png'} alt={'ингредиент'}/>
            </li>
          </ul>
          <div className={styles.price}>
            <span className={'text_type_digits-default'}>123</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </a>


      <a className={styles.item} href='#'>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#13119</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        </div>
        <h2 className={'text text_type_main-medium'}>Death Star Starship Main бургер</h2>
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/sp_1.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/core.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/salad.png'} alt={'ингредиент'}/>
            </li>
          </ul>
          <div className={styles.price}>
            <span className={'text_type_digits-default'}>123</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </a>
      <a className={styles.item} href='#'>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#13119</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        </div>
        <h2 className={'text text_type_main-medium'}>Death Star Starship Main бургер</h2>
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/sp_1.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/core.png'} alt={'ингредиент'}/>
            </li>
            <li className={styles.images}>
              <img className={styles.img} src={'https://code.s3.yandex.net/react/code/salad.png'} alt={'ингредиент'}/>
            </li>
          </ul>
          <div className={styles.price}>
            <span className={'text_type_digits-default'}>123</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </a>

    </>
  )
}


