import React, { Fragment } from 'react'

const FormattedPrice = ({ number }) => {

    return (

        <Fragment>

            <span className="whitespace-nowrap">

                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {process.env.REACT_APP_CURRENCY}

            </span>

        </Fragment>

    )

}

export default FormattedPrice
