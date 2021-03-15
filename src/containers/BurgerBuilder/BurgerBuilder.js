import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary/Auxiliary'  //wrapper component
import Burger from '../../components/Burger/Burger' //burger look
import BuildControls from '../../components/Burger/BuildControls/BuildControls'  //adding and removing of ingredients
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'  //hoc for error handling
import axios from '../../axios-order'  //instance of axios with base url
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'


/* const INGREDIENT_PRICES = {   //price of each ingredients
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
} */

export class BurgerBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {  //initial state
            purchasing: false
        }
    }

    componentDidMount() {  //fetches initial data from firebase
        //console.log(this.props);
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {  //to disable removeIngredients button 
            disableInfo[key] = disableInfo[key] <= 0 //true or false
        }

        //  {salad: true, meat: false ,etc...}

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded !</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.props.purchasable}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {  //provide store data to component
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        purchasable: state.burgerBuilder.purchasable
    };
}

const mapDispatchToProps = dispatch => {  //provide action creators as props to component
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));