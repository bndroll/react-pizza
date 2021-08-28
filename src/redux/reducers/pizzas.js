import axios from "axios"


const SET_PIZZAS = 'SET_PIZZAS'
const SET_LOADED = 'SET_LOADED'

const initialState = {
    items: [],
    isLoaded: false
}

const pizzas = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIZZAS: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case SET_LOADED: {
            return {
                ...state,
                isLoaded: action.payload
            }
        }
        default: return state
    }
}

export const actions = {
    setPizzas: (items) => ({ type: SET_PIZZAS, payload: items }),
    setLoaded: (payload) => ({ type: SET_LOADED, payload })
}

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(actions.setLoaded(false))

    // Работает на local json server port - 3001
    axios.get(`http://localhost:3001/pizzas?${category !== null ? `category=${category}` : ``}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(r => r.data)
        .then(r => dispatch(actions.setPizzas(r)))

    dispatch(actions.setLoaded(true))
}

export default pizzas