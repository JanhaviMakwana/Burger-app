import React from 'react';
import burgeLogo from '../../assets/Images/burger-logo.png';
import styles from '../Logo/Logo.module.css'

const logo = (props) => (
    <div className={styles["Logo"]}>
        <img src={burgeLogo} alt="MyBurger" />
    </div>
);

export default logo;