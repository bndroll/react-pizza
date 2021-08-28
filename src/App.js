import React from "react"
import {Route} from 'react-router-dom'

import {Header} from "./components/Header/Header"
import {HomePage} from "./pages/HomePage"
import {CartPage} from "./pages/CartPage"


const App = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <Route exact path='/' render={() => <HomePage /> } />
                <Route exact path='/cart' render={() => <CartPage /> } />
            </div>
        </div>
    )
}

export default App
