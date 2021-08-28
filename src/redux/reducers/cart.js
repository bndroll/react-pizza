const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART'
const REMOVE_PIZZA_TO_CART = 'REMOVE_PIZZA_TO_CART'
const INC_CART_ITEM = 'INC_CART_ITEM'
const DEC_CART_ITEM = 'DEC_CART_ITEM'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = (arr) => arr.reduce((sum, pizza) => pizza.price + sum, 0)

const _get = (pizzas, path) => {
    const [firstKey, ...keys] = path.split('.')
    return keys.reduce((value, key) => {
        return value[key]
    }, pizzas[firstKey])
}

const getTotalSum = (pizzas, path) => {
    return Object.values(pizzas).reduce((sum, pizzas) => {
        const value = _get(pizzas, path)
        return sum + value
    }, 0)
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PIZZA_TO_CART: {
            const currentPizzaItems = !state.items[action.payload.id] ?
                [action.payload] :
                [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id] : {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                },
            }

            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }
        case REMOVE_PIZZA_TO_CART: {
            const newItems = {
                ...state.items
            }
            const currentTotalPrice = newItems[action.payload].totalPrice
            const currentTotalCount = newItems[action.payload].items.length

            delete newItems[action.payload]

            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }
        case INC_CART_ITEM: {
            const newPizzaItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newPizzaItems,
                    totalPrice: getTotalPrice(newPizzaItems)
                }
            }

            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }
        case DEC_CART_ITEM: {
            const oldItems = state.items[action.payload].items
            const newPizzaItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newPizzaItems,
                    totalPrice: getTotalPrice(newPizzaItems)
                }
            }

            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }
        case CLEAR_CART: {
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            }
        }
        default: return state
    }
}

export const actions = {
    clearCart: () => ({ type: CLEAR_CART }),
    addPizzaToCart: (pizzaObj) => ({ type: ADD_PIZZA_TO_CART, payload: pizzaObj }),
    removePizzaToCart: (id) => ({ type: REMOVE_PIZZA_TO_CART, payload: id }),
    decrementCartItem: (id) => ({ type: DEC_CART_ITEM, payload: id }),
    incrementCartItem: (id) => ({ type: INC_CART_ITEM, payload: id })
}

export default cart