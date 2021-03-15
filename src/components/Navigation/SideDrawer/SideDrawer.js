import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let attachedClasses = [styles["SideDrawer"], styles["Close"]];
    if (props.open) {
        attachedClasses = [styles["SideDrawer"], styles["Open"]];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles["Logo"]}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;