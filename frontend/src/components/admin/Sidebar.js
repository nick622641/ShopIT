import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'
import IconButton from '@mui/material/IconButton'
import SpeedIcon from '@mui/icons-material/Speed'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StarIcon from '@mui/icons-material/Star'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import ExploreIcon from '@mui/icons-material/Explore'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import BrushIcon from '@mui/icons-material/Brush'

const Sidebar = () => {

    const [ isSidebarOpen, setSideBarOpen ] = useState(false)  
    const [ isMenuVisible, setMenuVisible ] = useState(false)
    const [ isCategoriesVisible, setCategoriesVisible ] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })    

    const sidebarAppear = useSpring({
        transform: isSidebarOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const toggleMenu = () => {
        setMenuVisible(isMenuVisible => !isMenuVisible)
    }
    const toggleCategories = () => {
        setCategoriesVisible(isCategoriesVisible => !isCategoriesVisible)
    }
    const menuAppear = useSpring({
        transform: isMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isMenuVisible ? 1 : 0
    })  
    const categoriesAppear = useSpring({
        transform: isCategoriesVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isCategoriesVisible ? 1 : 0
    })

    return (

        <Fragment>
            
            <button 
                className="filters show-filter"
                onClick={() => {setSideBarOpen(!isSidebarOpen)}}
            >
                {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
            </button>

            {(isSidebarOpen || !isMobile) && (
            <animated.div style={isMobile ? sidebarAppear : {}}>
            
                <nav>
                    <ul style={{ marginTop: 0 }}>

                        <li>
                            <Link to="/admin/dashboard">
                                <IconButton>
                                    <SpeedIcon color="secondary" />
                                </IconButton>
                                &nbsp; Dashboard
                            </Link>
                        </li>  
                        <li onClick={() => {toggleMenu()}} className="cursor-pointer">                        
                           
                            <IconButton>
                                <BrushIcon color="secondary" />
                            </IconButton>
                            &nbsp; Products
                            <IconButton sx={{ position: "absolute", right: 0 }}>
                                {isMenuVisible ? (
                                    <ArrowDropUpIcon color="secondary" />
                                ):(
                                    <ArrowDropDownIcon color="secondary" />
                                )}                                
                            </IconButton>
                       
                            {isMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={menuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/products">
                                            <IconButton>
                                                <ImageSearchIcon color="secondary" />
                                            </IconButton>                                            
                                            &nbsp; All
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/product">
                                            <IconButton>
                                                <AddIcon color="secondary" />
                                            </IconButton> 
                                            &nbsp; Create
                                        </Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>

                        <li onClick={() => {toggleCategories()}}  className="cursor-pointer">                      
                           
                            <IconButton>
                                <CategoryIcon color="secondary" />
                            </IconButton>
                            &nbsp; Categories
                            <IconButton sx={{ position: "absolute", right: 0 }}>
                                {isCategoriesVisible ? (
                                    <ArrowDropUpIcon color="secondary" />
                                ):(
                                    <ArrowDropDownIcon color="secondary" />
                                )}                                
                            </IconButton>
                        
                            {isCategoriesVisible && ( 
                                <animated.div className="dropdown-menu" style={categoriesAppear}>  
                                    <ul>                            
                                        <li>
                                            <Link to={`/admin/categoryOnes`}>
                                                <IconButton>
                                                    <PersonIcon color="secondary" />
                                                </IconButton>
                                                &nbsp; {process.env.REACT_APP_CATEGORY_ONE}
                                            </Link>
                                        </li>                    
                                        <li>
                                            <Link to={`/admin/categoryTwos`}>
                                                <IconButton>
                                                    <ExploreIcon color="secondary" />
                                                </IconButton>
                                                &nbsp; {process.env.REACT_APP_CATEGORY_TWO}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/categoryThrees`}>
                                                <IconButton>
                                                    <ColorLensIcon color="secondary" />
                                                </IconButton>
                                                &nbsp; {process.env.REACT_APP_CATEGORY_THREE}
                                            </Link>
                                        </li>
                                    </ul>
                                </animated.div>
                            )}
                        </li>                      
                        
                        <li>
                            <Link to="/admin/users">
                                <IconButton>
                                    <PeopleAltIcon color="secondary" />
                                </IconButton>
                                &nbsp; Users
                            </Link>
                        </li>
                         
                        <li>
                            <Link to="/admin/orders">
                                <IconButton>
                                    <ShoppingBasketIcon color="secondary" />
                                </IconButton>
                                &nbsp; Orders
                            </Link>
                        </li>                   

                        <li>
                            <Link to="/admin/reviews">
                                <IconButton>
                                    <StarIcon color="secondary" />
                                </IconButton>
                                &nbsp; Reviews
                            </Link>
                        </li>                        
               
                </ul>
            </nav>
        
        </animated.div>
        )}        

    </Fragment>

    )

}

export default Sidebar
