import React, { useContext } from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Products from './products/Products'
import NotFound from './utils/notfound/NotFound';
import ProductDetail from './productdetail/ProductDetail';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createproduct/CreateProduct';
import { GlobalState } from '../../GlobalState'



function Pages() {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    return (

        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={ProductDetail} />
            <Route path="/history" exact component={OrderHistory} />
            <Route path="/history/:id" exact component={OrderDetails} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages