import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { getProducts } from '../actions/productActions'
import { getCategoryOnes, getCategoryTwos, getCategoryThrees } from '../actions/categoryActions'
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
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {

    const categoryOnePath   = process.env.REACT_APP_CATEGORY_ONE.toLowerCase().replace(/ /g, '-')
    const categoryTwoPath   = process.env.REACT_APP_CATEGORY_TWO.toLowerCase().replace(/ /g, '-')
    const categoryThreePath = process.env.REACT_APP_CATEGORY_THREE.toLowerCase().replace(/ /g, '-')

    const dispatch = useDispatch()
    const alert    = useAlert()    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const keyword  = useParams().keyword    
    const categoryOneQuery   = useParams().type
    const categoryTwoQuery   = useParams().brand 
    const categoryThreeQuery = useParams().service 
    const rating             = useParams().rating 
    const categoryOne        = categoryOneQuery   ? categoryOneQuery.replace(/-/g, ' ')   : ''
    const categoryTwo        = categoryTwoQuery   ? categoryTwoQuery.replace(/-/g, ' ')   : ''
    const categoryThree      = categoryThreeQuery ? categoryThreeQuery.replace(/-/g, ' ') : ''

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ price,       setPrice       ] = useState([1, 100000])    
    const [ isMenuOpen,  setIsMenuOpen  ] = useState(false)   

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
        dispatch(getCategoryOnes())        
        dispatch(getCategoryTwos())
        dispatch(getCategoryThrees())
        if(error) {
            return alert.error(error)        
        }         
        dispatch(getProducts(keyword, currentPage, price, categoryOneQuery, categoryTwoQuery, categoryThreeQuery, rating))    

    }, [dispatch, alert, error, keyword, currentPage, price, categoryOneQuery, categoryTwoQuery, categoryThreeQuery, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let title = 'Latest Products' 
     
    if ( keyword       ) { title = keyword }
    if ( categoryOne   ) { title = categoryOne }
    if ( categoryTwo   ) { title = categoryTwo }
    if ( categoryThree ) { title = categoryThree }
    if ( rating        ) { title = `Rating ${rating} / 5` }  

    return (       

        <Fragment>

            <MetaData title={`Gallery - ${title}`} />                                      

            <div className="container">

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

                                <h3>
                                    Filters
                                    <Link to="/gallery">
                                        <IconButton className="float-r">
                                            <AutorenewIcon color="primary" />
                                        </IconButton>
                                    </Link>
                                </h3>    

                                <h6>Price Range</h6>

                                <Range 
                                    marks={{
                                        1 : `THB 1`,
                                        100000 : `THB 100000`
                                    }}
                                    min={1}
                                    max={100000}
                                    defaultValue={[1, 100000]}
                                    tipFormatter={value => `$${value}`}
                                    tipProps={{
                                        placement: "top"                                                    
                                    }}
                                    value={price}
                                    onChange={(price) => {
                                        setPrice(price)                          
                                        resetPage()
                                    }}
                                    style={{ margin: "20px 0 50px 0" }}
                                />  

                                {categoryOnes && categoryOnes.length > 0 && (   
                                    
                                    <Fragment>

                                        <h6>{process.env.REACT_APP_CATEGORY_ONE}</h6>

                                        <ul>   
                                            {categoryOnes.map(_categoryOne => (
                                                <li                                           
                                                    key={_categoryOne.name}                             
                                                    className={categoryOneQuery === _categoryOne.slug ? 'link-active' : ''}
                                                >                                                                          
                                                    <Link 
                                                        to={`/gallery/${categoryOnePath}/${_categoryOne.slug}`}
                                                        className="whitespace-nowrap"
                                                    >
                                                        <Checkbox 
                                                            checked={categoryOneQuery === _categoryOne.slug ? true : false} 
                                                            size="small"
                                                            sx={{ py: 0.3 }}
                                                            color="primary"
                                                        />                                      
                                                        {_categoryOne.name}
                                                    </Link>
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
                                                    className={categoryTwoQuery === _categoryTwo.slug ? 'link-active' : ''}
                                                >
                                                    <Link to={`/gallery/${categoryTwoPath}/${_categoryTwo.slug}`}>
                                                        <Checkbox 
                                                            checked={categoryTwoQuery === _categoryTwo.slug ? true : false} 
                                                            size="small"
                                                            sx={{ py: 0.3 }}
                                                            color="primary"
                                                        />                                            
                                                        {_categoryTwo.name}
                                                    </Link>
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
                                                    className={categoryThreeQuery === _categoryThree.slug ? 'link-active' : ''}
                                                >
                                                    <Link to={`/gallery/${categoryThreePath}/${_categoryThree.slug}`}>
                                                        <Checkbox 
                                                            checked={categoryThreeQuery === _categoryThree.slug ? true : false} 
                                                            size="small"
                                                            sx={{ py: 0.3 }}
                                                            color="primary"
                                                        />                                       
                                                        {_categoryThree.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>  

                                    </Fragment>

                                )}
                                
                                {categoryOnes && categoryOnes.length > 0 && (

                                    <Fragment>

                                        <h6>Ratings</h6>

                                        <ul>
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <li key={star}>
                                                    <Link to={`/gallery/rating/${star}`}>
                                                        <Rating 
                                                            value={star} 
                                                            sx={{ color: "var(--primary-color)" }} 
                                                            readOnly
                                                        />                                            
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                    </Fragment>

                                )}

                                <button 
                                    className="filters"
                                    onClick={resetPage}
                                >
                                    Hide Menu
                                </button>

                            </animated.div>
                        
                        )} 

                    </aside>

                    <article className={!isMobile ? 'relative' : ''}>                         

                        <h1 style={{ textTransform: "uppercase" }}>{title}</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div className="parent">
                                    <span>
                                        { price[0] > 1 || price[1] < 100000 ? ' From THB' + price[0] + ' to THB' + price[1]: ''}                        
                                    </span> 
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > filteredProductsCount ? filteredProductsCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{filteredProductsCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {products && filteredProductsCount > 0                             
                                        ?   products.map(product => (
                                                <Product key={product._id} product={product} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
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
