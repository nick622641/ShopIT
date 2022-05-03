import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProductDetails, getProducts, deleteReview } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET, DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Review from '../modals/Review'
import Contact from '../modals/Contact'
import ListReviews from '../review/ListReviews'
import Lightbox from '../layouts/images/Lightbox'
import Social from '../layouts/Social'
import FormattedPrice from '../layouts/FormattedPrice'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LoginIcon from '@mui/icons-material/Login'
import Quantity from './Quantity'
import Rating from '@mui/material/Rating'
// import StructuredData from './StructuredData'
import RichtextOutput from '../layouts/richtext/RichtextOutput'
import { Button } from '@mui/material'
import Product from './Product'
import Breadcrumbs from '../layouts/breadcrumbs/Breadcrumbs'

const ProductDetails = () => { 

    const slug = useParams().slug    

    const alert    = useAlert()
    const dispatch = useDispatch()

    const { error: reviewError, success     } = useSelector( state => state.newReview )
    const { loading, product, error         } = useSelector( state => state.productDetails )
    const { user                            } = useSelector( state => state.auth )  
    const { isDeleted, error: deleteError   } = useSelector( state => state.review ) 
    const { products, filteredProductsCount } = useSelector( state => state.products )

    const [ modalType,         setIModalType        ] = useState()    
    const [ quantity,          setQuantity          ] = useState(1)
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)     
    
    let rating = 0
    let comment = ''  

    if ( user && product && product.numOfReviews > 0 ) {
        for (let i = 0; i < product.numOfReviews; i++) {
            if ( product.reviews[i].user === user._id ) {                    
                rating = product.reviews[i].rating
                comment = product.reviews[i].comment
            }
        }
    } 

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   
    const toggleLightbox = (imgIndex) => {   
        setIImageIndex(imgIndex)      
        setIsLightboxVisible(wasLightboxVisible => !wasLightboxVisible)   
    } 
    const slideTopAnimation = useSpring({     
        opacity: isLightboxVisible ? 1 : 0,
        transform: isLightboxVisible ? `translateY(0%)` : `translateY(-100%)`
    })

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, product._id))        
    }  

    useEffect( () => {   

        dispatch(getProducts( '', 1, [1, process.env.REACT_APP_MAX_PRICE], product.categoryOne, '', '', 0, '', product._id))
 
        if(reviewError) { 
            alert.error(reviewError)
            dispatch(clearErrors())
         } 
         if(success) {
            alert.success('Review Posted Successfully')
            dispatch({ type: NEW_REVIEW_RESET })
            setIsModalVisible(false)
        } 
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }    
        if(isDeleted) {
            alert.success('Review Deleted Successfully')            
            dispatch({ type: DELETE_REVIEW_RESET })
        }         
    }, [dispatch, success, alert, reviewError, deleteError, isDeleted, product.categoryOne, product._id])

    useEffect(() => {

        dispatch(getProductDetails(slug))
        
        if(error) {            
            alert.error(error)  
            dispatch(clearErrors())          
        } 
    }, [dispatch, alert, error, slug])

    const addToCart = () => {
        dispatch(addItemToCart(product.slug, quantity))
        alert.success('Item Added to Cart')
    }
    
    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={product.name} description={product.description} />

                    {/* {product.images && (
                        <StructuredData
                            title={product.name}
                            description={product.description}
                            thumb={product.images[0].thumbUrl}
                            image={product.images[0].url}
                            date={product.datePublished}
                            artist={product.categoryOne}
                            medium={product.media}
                            rating={product.ratings}
                        />
                    )} */}                    

                    <div className="container"> 
                        
                        <Breadcrumbs title={product.name} />
                            
                        <div className="wrapper">

                            <div className="portrait parent">

                                <div>
                                    {product.images && (
                                        <img src={product.images[0].url} alt={product.name} />
                                    )}
                                    <ul className="thumbnails">
                                    {product.images && product.images.map((image, index) => (
                                        <li 
                                            key={image.public_id}
                                            onClick={() => toggleLightbox(index)}
                                        >
                                            <img 
                                                src={image.thumbUrl} 
                                                alt={product.name} 
                                                className="object-fit"
                                            />
                                        </li>
                                    ))}
                                    </ul>                                       
                                </div>  

                                <div style={{ width: "40px" }} />                                  

                                <div>  

                                    <h1 className="text-center">{product.name}</h1>  

                                    <h3
                                         className="text-center"
                                         style={{ color: "#999", fontSize: "22px" }}
                                    >
                                        {product.serial}
                                    </h3>                                      

                                    <table>  
                                        <tbody>                                                 
                                            <tr>
                                                <th className="text-right">{process.env.REACT_APP_CATEGORY_ONE}</th>
                                                <td>
                                                    {product.categoryOne}
                                                </td>
                                            </tr>  
                                            {product.width && product.height && (
                                                 <tr>
                                                    <th className="text-right">Dimensions</th>
                                                    <td>{product.width} cm <small>x</small> {product.height} cm</td>
                                                </tr>
                                            )} 
                                            <tr>
                                                <th className="text-right">{process.env.REACT_APP_CATEGORY_TWO}</th>
                                                <td>
                                                    {product.categoryTwo}
                                                </td>
                                            </tr>                                       
                                            <tr>
                                                <th className="text-right">Status</th>
                                                <td className={product.stock === 0 ? "danger" : ""}>                                              
                                                    {product.stock > 0 ? product.stock : null}                                                     
                                                    &nbsp;
                                                    {product.stock > 0 ? 'in Stock' : 'Out of Stock'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-right">Price</th>    
                                                <td>
                                                    <i style={{ fontSize: "22px", color: "var(--primary-color)" }}>                                                                                                              
                                                        {product.price && (
                                                            <FormattedPrice number={product.price} />
                                                        )}  
                                                    </i>
                                                </td>
                                            </tr>                                              
                                            <tr>
                                                <th className="text-right">Reviews</th>    
                                                <td className="whitespace-nowrap">
                                                    <Rating                                                            
                                                        value={product.ratings} 
                                                        sx={{ color: "var(--primary-color)" }} 
                                                        precision={0.5} 
                                                        readOnly 
                                                    /> 
                                                    <br />                                                      
                                                    ({product.numOfReviews} Reviews)
                                                </td>
                                            </tr>
                                            <tr>                                                
                                                <td 
                                                    className="text-center"
                                                    colSpan="2"
                                                >
                                                {user ? 
                                                    <Fragment>
                                                        <IconButton onClick={() => {toggleModal(<Review  rating={rating} comment={comment} />)}}>
                                                            <EditOutlinedIcon color="primary" />
                                                        </IconButton>
                                                        Post Review  
                                                    </Fragment>      
                                                : 
                                                    <Link to={`/login?redirect=product/${slug}`}>
                                                        <IconButton>
                                                            <LoginIcon color="primary" />
                                                        </IconButton>    
                                                        Login to Post a Review                                                      
                                                    </Link>
                                                } 
                                                </td>
                                            </tr>                                                
                                        </tbody>     
                                    </table>  

                                    <br />

                                    <div> 
                                        <div className="text-center"> 
                                            <Button 
                                                variant="contained" 
                                                sx={{ width: '100%', mb: 4 }}
                                                onClick={addToCart}
                                                disabled={product.stock === 0 ? true : false}
                                            >
                                                Add to Cart 
                                            </Button>                                               
                                        </div>  
                                        <div className="whitespace-nowrap text-center">
                                            Quantity &nbsp;                                               
                                            <Quantity 
                                                quantity={quantity}
                                                stock={product.stock}
                                                setQuantity={setQuantity}                                                       
                                            />                                               
                                        </div>  
                                    </div>
                                    
                                </div>
                            </div> 
                        </div>
                    </div>   

                    <div className="container">	
                        <div className="wrapper">	                                  
                            <div>
                                <h3>Share</h3>                                
                                <h2>Spread the word about {product.name}</h2>                                    
                                <Social />
                            </div>
                            <div>
                                {product.description && (
                                    <RichtextOutput text={product.description} />
                                )}                                
                                <div style={{ marginTop: "40px" }}>        
                                    <small>Contact Us</small>  
                                    <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                        <EmailIcon color="primary" />                                        
                                    </IconButton>   
                                </div>     
                            </div>                                
                        </div>                        
                    </div>  

                    <div className="container">
                        {product.images && (
                            <img src={product.images[0].url} alt={product.name} />
                        )} 
                    </div>

                    {product.reviews && product.reviews.length > 0 && (  
                        <div className="container">
                            <div className="wrapper">                                    
                                <ListReviews 
                                    reviews={product.reviews} 
                                    user={user} 
                                    toggleModal={toggleModal}
                                    deleteReviewHandler={deleteReviewHandler}
                                />   
                            </div>
                        </div>
                    )}

                    <div className="container">
                        <div className="wrapper">  
                            {products && filteredProductsCount > 0 && (                              
                                <Fragment>
                                    <h2>Similar products</h2> 
                                    <div className="showroom">  
                                        {products.map(product => (
                                            <Product key={product._id} product={product} />                                    
                                        ))}  
                                    </div>
                                </Fragment>
                            )}  
                        </div>
                    </div>                                    

                    {isLightboxVisible && (
                        <Lightbox 
                            product={product} 
                            isLightboxVisible={isLightboxVisible} 
                            toggleLightbox={() => toggleLightbox(imageIndex)}  
                            slideTopAnimation={slideTopAnimation}
                            imgIndex={imageIndex}  
                        />
                    )}                        
                    
                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={modalType}
                    />  

                </Fragment>

            )}

        </Fragment>    

    )

}

export default ProductDetails
