import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"

import filters from './reducers/filters'
import pizzas from './reducers/pizzas'
import cart from "./reducers/cart"


const rootReducer = combineReducers({
    filters,
    pizzas,
    cart
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store