import React from 'react';
import styles from '../Burger/Burger.module.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'
//burger rendering to screen

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {  //keys//
            return [...Array(props.ingredients[igKey])].map((_, i) => {   //gives array [undefined, undefines] depend on value of ingredients
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((arr, el) => {  //Arr => prev Value el => present Value
            return arr.concat(el);  //concate with initial value
        }, [] /* initial value */);

    /* console.log(transformedIngredients); */

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients !</p>
    }



    return (
        <div className={styles["Burger"]}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};


export default burger;