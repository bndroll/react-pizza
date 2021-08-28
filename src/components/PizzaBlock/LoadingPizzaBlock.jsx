import React from "react"
import ContentLoader from 'react-content-loader'


export const LoadingPizzaBlock = () => {
    return (
        <ContentLoader className='pizza-block'
                       height={460}
                       width={280}
                       backgroundColor='#f3f3f3'
                       foregroundColor="#ecebeb"
                       speed={2}
                       viewBox="0 0 280 460">
            <circle cx="132" cy="142" r="115" />
            <rect x="0" y="273" rx="6" ry="6" width="280" height="26" />
            <rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
            <rect x="0" y="418" rx="6" ry="6" width="91" height="31" />
            <rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
        </ContentLoader>
    )
}