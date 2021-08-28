import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {Categories} from "../components/Categories/Categories"
import {SortPopup} from "../components/SortPopup/SortPopup"
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock"
import {LoadingPizzaBlock} from "../components/PizzaBlock/LoadingPizzaBlock"
import {actions as actionsCart} from "../redux/reducers/cart"
import {actions as actionsFilters} from '../redux/reducers/filters'
import {fetchPizzas} from "../redux/reducers/pizzas"


const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortItems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавит', type: 'name', order: 'asc' },
]

export const HomePage = () => {
    const dispatch = useDispatch()
    const {items, isLoaded} = useSelector((state) => state.pizzas)
    const {category, sortBy} = useSelector((state) => state.filters)

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy])

    const onSelectCategory = useCallback(id => {
        dispatch(actionsFilters.setCategory(id))
    }, [])

    const onSelectSortType = React.useCallback(item => {
        dispatch(actionsFilters.setSortBy(item.type, item.order))
    }, [])

    const addPizzaHandler = pizza => dispatch(actionsCart.addPizzaToCart(pizza))

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category}
                            onClickCategory={onSelectCategory}
                            items={categoryNames}/>

                <SortPopup activeSortType={sortBy.type}
                           onClickSortType={onSelectSortType}
                           items={sortItems} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map(pizza => <PizzaBlock key={pizza.id}
                                                            addPizzaHandler={addPizzaHandler}
                                                            addedCount={5}
                                                            {...pizza} />)
                    : Array(12).fill(0).map((_, id) => <LoadingPizzaBlock key={id}/>)}
            </div>
        </div>
    )
}