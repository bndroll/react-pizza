import React, {useState} from "react"
import classNames from "classnames"
import PropTypes from 'prop-types'

import {Button} from "../Button/Button"


export const PizzaBlock = ({id, name, imageUrl, price, types, sizes, addPizzaHandler, addedCount}) => {
    const availableTypes = ['тонкое', 'традиционное']
    const availableSizes = [26, 30, 40]

    const [activeSize, setActiveSize] = useState(0)
    const [activeType, setActiveType] = useState(types[0])

    const onSelectType = (i) => setActiveType(i)
    const onSelectSize = (i) => setActiveSize(i)

    const onAddPizza = () => {
        const pizza = {
            id,
            name,
            imageUrl,
            price,
            size: availableSizes[activeSize],
            type: availableTypes[activeType],
        }
        addPizzaHandler(pizza)
    }

    return (
        <div className="pizza-block">
            <img className="pizza-block__image"
                 src={imageUrl}
                 alt="Pizza"/>
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {availableTypes.map((t, i) => (
                        <li key={t}
                            onClick={() => onSelectType(i)}
                            className={classNames({
                                'active': activeType === i,
                                'disabled': !types.includes(i)
                            })}>{t}</li>
                    ))}
                </ul>
                <ul>
                    {availableSizes.map((s, i) => (
                        <li key={s}
                            onClick={() => onSelectSize(i)}
                            className={classNames({
                                'active': activeSize === i,
                                'disabled': !sizes.includes(s)
                            })}>{s} см.</li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <Button onClick={onAddPizza} className="button--outline button--add">
                    <svg width="12"
                         height="12"
                         viewBox="0 0 12 12"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">

                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                              fill="white" />
                    </svg>
                    <span>Добавить</span>
                    {addedCount && <i>{addedCount}</i>}
                </Button>
            </div>
        </div>
    )
}

PizzaBlock.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    addPizzaHandler: PropTypes.func,
    addedCount: PropTypes.number
}

PizzaBlock.defaultProps = {
    name: '---',
    price: 0,
    types: [],
    sizes: [],
}