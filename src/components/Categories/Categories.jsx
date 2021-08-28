import React from "react"
import PropTypes from 'prop-types'


export const Categories = React.memo(function Categories({items, onClickCategory, activeCategory}) {
    return (
        <div className="categories">
            <ul>
                <li onClick={() => onClickCategory(null)}
                    className={activeCategory === null ? 'active' : ''}>Все</li>

                {items && items.map((item, i) => {
                    return <li className={activeCategory === i ? 'active' : ''}
                               onClick={() => onClickCategory(i)}
                               key={`${item}_${i}`}>{item}</li>
                })}
            </ul>
        </div>
    )
})

Categories.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.isRequired,
}

Categories.defaultProps = {
    activeCategory: null,
    items: []
}