import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { getProducts } from '../actions/productActions'
import { getCategoryOnes, getCategoryTwos, getCategoryThrees } from '../actions/categoryActions'
import { Tooltip } from '@mui/material'
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import IconButton from '@mui/material/IconButton'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import Checkbox from '@mui/material/Checkbox'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Rating from '@mui/material/Rating'
import FormattedPrice from './layouts/FormattedPrice'
import Filter from './product/Filter'
import 'rc-slider/assets/index.css'
import Breadcrumbs from './layouts/breadcrumbs/Breadcrumbs'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {    

    const dispatch = useDispatch()
    const alert    = useAlert()    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const keyword  = useParams().keyword
   
    const [ rating,      setRating          ] = useState(0)
    const [ categoryOne, setCategoryOne     ] = useState('')
    const [ categoryTwo, setCategoryTwo     ] = useState('')
    const [ categoryThree, setCategoryThree ] = useState('')

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ price,       setPrice       ] = useState([1, process.env.REACT_APP_MAX_PRICE])    
    const [ isMenuOpen,  setIsMenuOpen  ] = useState(false)   
    const [ filter,      setFilter      ] = useState('') 

    const { categoryOnes   } = useSelector( state => state.categoryOnes )    
    const { categoryTwos   } = useSelector( state => state.categoryTwos )  
    const { categoryThrees } = useSelector( state => state.categoryThrees )
    const { loading, products, resPerPage, filteredProductsCount, error } = useSelector( state => state.products )

    const menuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const resetPage = () => {
        setCurrentPage(1)
        setIsMenuOpen(false)
        window.scrollTo(0, 0)           
    }

    useEffect( () => {        
        if(error) {
            return alert.error(error)        
        }         
        dispatch(getProducts(keyword, currentPage, price, categoryOne, categoryTwo, categoryThree, rating, filter))    

    }, [dispatch, alert, error, keyword, currentPage, price, categoryOne, categoryTwo, categoryThree, rating, filter])

    useEffect( () => {
        dispatch(getCategoryOnes())        
        dispatch(getCategoryTwos())
        dispatch(getCategoryThrees())
    }, [dispatch] )
    
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    let title = 'Latest Products' 
     
    if ( keyword       ) { title = keyword }
    if ( categoryOne   ) { title = categoryOne }
    if ( categoryTwo   ) { title = categoryTwo }
    if ( categoryOne && categoryTwo ) { title = `${categoryOne} (${categoryTwo})` }

    return (  
        <Fragment>
            <MetaData title={`Gallery - ${title}`} />
            <div className="container">                
                <Breadcrumbs title={title} />
                <div className="wrapper parent">  
                    <aside>
                        <button 
                            className="filters"
                            onClick={() => {setIsMenuOpen(!isMenuOpen)}}
                        >
                            Show Menu
                        </button>
                        {(isMenuOpen || !isMobile) && (
                            <animated.div style={isMobile ? menuAppear : {}}>
                                <h3 className="relative">
                                    Filters
                                    <Link to="/gallery">
                                        <Tooltip title="Clear Filters" arrow>
                                            <IconButton 
                                                style={{ position: "absolute", top: "-10px", right: "-10px" }}
                                            >
                                                <AutorenewIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </h3>   
                                <h6>Price Range</h6>
                                <Range                                     
                                    min={1}
                                    max={process.env.REACT_APP_MAX_PRICE}
                                    defaultValue={[1, process.env.REACT_APP_MAX_PRICE]}
                                    tipFormatter={value => `฿${value}`}
                                    tipProps={{
                                        placement: "top",
                                        visible: true                                                    
                                    }}
                                    value={price}
                                    onChange={(price) => {
                                        setPrice(price)                          
                                        resetPage()
                                    }}
                                    style={{ margin: "70px 0 20px 0", width: "calc(100% - 10px)" }}
                                />  
                                <Filter filter={filter} setFilter={setFilter} />
                                {categoryOnes && categoryOnes.length > 0 && (                                       
                                    <Fragment>
                                        <h6 style={{ marginTop: "40px" }}>{process.env.REACT_APP_CATEGORY_ONE}</h6>
                                        <ul>   
                                            {categoryOnes.map(_categoryOne => (
                                                <li                                           
                                                    key={_categoryOne.name}                             
                                                    className={categoryOne === _categoryOne.name ? 'link-active' : ''}
                                                    onClick={() => {
                                                        setCategoryOne(categoryOne === _categoryOne.name ? '' : _categoryOne.name)
                                                        resetPage()
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                > 
                                                    <Checkbox 
                                                        checked={categoryOne === _categoryOne.name ? true : false} 
                                                        size="small"
                                                        sx={{ py: 0.3 }}
                                                        color="primary"
                                                    />                                      
                                                    {_categoryOne.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </Fragment>
                                )}
                                {categoryTwos && categoryTwos.length > 0 && (
                                    <Fragment>
                                        <h6>{process.env.REACT_APP_CATEGORY_TWO}</h6>
                                        <ul>
                                            {categoryTwos.map(_categoryTwo => (
                                                <li                                           
                                                    key={_categoryTwo.name}                               
                                                    className={categoryTwo === _categoryTwo.name ? 'link-active' : ''}
                                                    onClick={() => {
                                                        setCategoryTwo(categoryTwo === _categoryTwo.name ? '' : _categoryTwo.name)
                                                        resetPage()
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Checkbox 
                                                        checked={categoryTwo === _categoryTwo.name ? true : false} 
                                                        size="small"
                                                        sx={{ py: 0.3 }}
                                                        color="primary"
                                                    />                                            
                                                    {_categoryTwo.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </Fragment>
                                )}
                                {categoryThrees && categoryThrees.length > 0 && (
                                    <Fragment>
                                        <h6>{process.env.REACT_APP_CATEGORY_THREE}</h6>
                                        <ul>
                                            {categoryThrees.map(_categoryThree => (
                                                <li                                           
                                                    key={_categoryThree.name}                                    
                                                    className={categoryThree === _categoryThree.name ? 'link-active' : ''}
                                                    onClick={() => {
                                                        setCategoryThree(categoryThree === _categoryThree.name ? '' : _categoryThree.name)
                                                        resetPage()
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Checkbox 
                                                        checked={categoryThree === _categoryThree.name ? true : false} 
                                                        size="small"
                                                        sx={{ py: 0.3 }}
                                                        color="primary"
                                                    />                                       
                                                    {_categoryThree.name}
                                                </li>
                                            ))}
                                        </ul>  
                                    </Fragment>
                                )}   
                                <h6>Ratings</h6>
                                <ul>
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <li 
                                            key={star}
                                            onClick={() => {
                                                setRating(rating === star ? 0 : star)
                                                resetPage()
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Rating 
                                                value={star} 
                                                sx={{ color: "var(--primary-color)" }} 
                                                readOnly
                                            />                                            
                                        </li>
                                    ))}
                                </ul>                             
                                <button 
                                    className="filters"
                                    onClick={resetPage}
                                >
                                    Hide Menu
                                </button>
                            </animated.div>                        
                        )} 
                    </aside>

                    <article className={!isMobile ? "relative" : ""}>
                        <h1>{title}</h1>
                        {loading ? <Loader /> : (  
                            <Fragment>
                                <div className="parent">
                                    {(price[0] > 1 || price[1] < process.env.REACT_APP_MAX_PRICE) && (
                                        <span>
                                            From <b><FormattedPrice number={price[0]} /></b> to <b><FormattedPrice number={price[1]} /></b>  
                                        </span> 
                                    )}                                  
                                    <span>
                                        <Rating 
                                            value={rating > 0 ? rating : null} 
                                            sx={{ color: "var(--primary-color)" }} 
                                            readOnly
                                        />
                                    </span>                                    
                                    <span style={{ fontSize: "14px" }}>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > filteredProductsCount ? filteredProductsCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{filteredProductsCount}
                                    </span> 
                                </div>
                                {categoryThree && (
                                    <span>
                                        Service: <b>{categoryThree}</b>
                                    </span>
                                )}
                                <div className="showroom">
                                    {products && filteredProductsCount > 0                             
                                        ?   products.map(product => (
                                                <Product key={product._id} product={product} />                                    
                                            )) 
                                        :   <p style={{ padding: "0 15px" }}>No Results Found</p>
                                    }    
                                </div>
                                {resPerPage <= filteredProductsCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={filteredProductsCount}                        
                                            onChange={setCurrentPageNo}   
                                            nextPageText={<KeyboardArrowRightIcon />}  
                                            prevPageText={<KeyboardArrowLeftIcon />} 
                                            firstPageText={<FirstPageIcon />} 
                                            lastPageText={<LastPageIcon />}  
                                        />
                                    </div>
                                )} 
                            </Fragment>                         
                        )}
                    </article> 
                </div>
            </div>  
        </Fragment>   
    )
}

export default Gallery
