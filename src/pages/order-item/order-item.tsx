import styles from "./order-item.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderItem = () => {

  return (
    <div className={styles.wrap}>
      <section className={`${styles.header} mb-15`}>
        <h2 className={`${styles.header_title} text_type_digits-default mb-10`}>#13119</h2>
        <h2 className={'text text_type_main-medium mb-3'}>Death Star Starship Main бургер</h2>
        <span className={'text text_type_main-small '}>Создан</span>
      </section>

      <section className={styles.body}>
        <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
        <ul className={styles.ingredients_list}>
          <li className={styles.ingredient_item}>
              <img className={styles.ingredient_img} alt={'ингредиент'} src={'https://code.s3.yandex.net/react/code/sp_1.png'}/>
              <h3 className={`${styles.ingredient_title} text text_type_main-default`}>Флюоресцентная булка R2-D3</h3>
              <span className={`${styles.count} text_type_digits-default`}>2 X 123
                <CurrencyIcon type="primary" />
              </span>
          </li>
          <li className={styles.ingredient_item}>
            <img className={styles.ingredient_img} alt={'ингредиент'} src={'https://code.s3.yandex.net/react/code/sp_1.png'}/>
            <h3 className={`${styles.ingredient_title} text text_type_main-default`}>Флюоресцентная булка R2-D3</h3>
            <span className={`${styles.count} text_type_digits-default`}>2 X 123
                <CurrencyIcon type="primary" />
              </span>
          </li>
          <li className={styles.ingredient_item}>
            <img className={styles.ingredient_img} alt={'ингредиент'} src={'https://code.s3.yandex.net/react/code/sp_1.png'}/>
            <h3 className={`${styles.ingredient_title} text text_type_main-default`}>Флюоресцентная  Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентнаябулка R2-D3</h3>
            <span className={`${styles.count} text_type_digits-default`}>2 X 123
                <CurrencyIcon type="primary" />
              </span>
          </li>
          <li className={styles.ingredient_item}>
            <img className={styles.ingredient_img} alt={'ингредиент'} src={'https://code.s3.yandex.net/react/code/sp_1.png'}/>
            <h3 className={`${styles.ingredient_title} text text_type_main-default`}>Флюоресцентная  Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентнаябулка R2-D3</h3>
            <span className={`${styles.count} text_type_digits-default`}>2 X 123
                <CurrencyIcon type="primary" />
              </span>
          </li>
          <li className={styles.ingredient_item}>
            <img className={styles.ingredient_img} alt={'ингредиент'} src={'https://code.s3.yandex.net/react/code/sp_1.png'}/>
            <h3 className={`${styles.ingredient_title} text text_type_main-default`}>Флюоресцентная  Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентная Флюоресцентнаябулка R2-D3</h3>
            <span className={`${styles.count} text_type_digits-default`}>2 X 123
                <CurrencyIcon type="primary" />
              </span>
          </li>
        </ul>
      </section>

      <section className={styles.footer}>
        <time className={`${styles.footer_date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        <div className={styles.footer_price}>
          <span className={'text_type_digits-default'}>123</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>

    </div>
  )
}


