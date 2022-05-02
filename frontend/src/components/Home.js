import React, { Fragment, useEffect, useState      } from 'react'
import { useDispatch, useSelector                  } from 'react-redux'
import { getProducts                               } from '../actions/productActions'
import FirstPageIcon                                 from '@mui/icons-material/FirstPage'
import LastPageIcon                                  from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon                         from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon                        from '@mui/icons-material/KeyboardArrowRight'
import Pagination                                    from 'react-js-pagination'
import MetaData                                      from './layouts/MetaData'
import Loader                                        from './layouts/Loader'
import Product                                       from './product/Product'
import Filter from './product/Filter'

const Home = () => {  
    
    const dispatch = useDispatch()

    const [ currentPage, setCurrentPage ] = useState(1) 
    const [ filter,      setFilter      ] = useState('') 

    const { loading, products, resPerPage, error, productsCount } = useSelector( state => state.products )

    useEffect(() => {  
        if(error) {
            return alert.error(error)        
        } 
        dispatch(getProducts('', currentPage, [1, process.env.REACT_APP_MAX_PRICE], '', '', '', 0, filter)) 
    }, [dispatch, currentPage, error, filter])

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            <MetaData title={'Home'} />   
            <div className="container">
                <div className="wrapper"> 
                    {loading ? <Loader /> : (
                        <Fragment>
                            <h1>Latest Products</h1>
                            <Filter filter={filter} setFilter={setFilter} />                            
                            <div className="showroom">
                                {products && products.length > 0                             
                                    ?   products.map(product => (
                                            <Product key={product._id} product={product} />                                    
                                        )) 
                                    :   <p>No Results Found</p>
                                }    
                            </div>  
                        </Fragment>                  
                    )}
                    {resPerPage <= productsCount && (
                        <div onClick={() => window.scrollTo(0, 0)}>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}                        
                                onChange={setCurrentPageNo}   
                                nextPageText={<KeyboardArrowRightIcon />}  
                                prevPageText={<KeyboardArrowLeftIcon />} 
                                firstPageText={<FirstPageIcon />} 
                                lastPageText={<LastPageIcon />}  
                            />
                        </div>
                    )}  
                </div>
            </div>              
        </Fragment>
    )
}

export default Home