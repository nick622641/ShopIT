import React from 'react'
import { Link } from 'react-router-dom'
import './breadcrumbs.css'

const Breadcrumbs = ({ title }) => {

  return (

    <div className="breadcrumbs">
        <Link to="/">
            <small>Home</small>
        </Link>
        &nbsp;/&nbsp;
        <Link to="/gallery">
            <small>Gallery</small>
        </Link>
        &nbsp;/&nbsp;
        <span>
            <small>{title}</small>
        </span>
    </div>

  )

}

export default Breadcrumbs