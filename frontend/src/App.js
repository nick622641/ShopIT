import { Fragment, useEffect, useState } from 'react'
import { useTransition, animated       } from 'react-spring'
import { Routes, Route, useLocation    } from 'react-router-dom'
import { loadUser                      } from './actions/userActions'
import { useSelector                   } from 'react-redux'
import store                             from './store'
import axios                             from 'axios'
// Payment imports 
import { Elements                      } from '@stripe/react-stripe-js'
import { loadStripe                    } from '@stripe/stripe-js'
// Layout imports 
import Header                            from './components/layouts/Header'
import Footer                            from './components/layouts/Footer'
import PrivateRoute                      from './components/route/PrivateRoute'
import ScrollToTop                       from './components/route/ScrollToTop'
// Page imports 
import Home                              from './components/Home'
import Terms                             from './components/Terms'
import Privacy                           from './components/Privacy'
// Product Imports 
import Gallery                           from './components/Gallery'
import ProductDetails                    from './components/product/ProductDetails'
// User Imports 
import Login                             from './components/user/Login'
import Register                          from './components/user/Register'
import Profile                           from './components/user/Profile'
import UpdateProfile                     from './components/user/UpdateProfile'
import UpdatePassword                    from './components/user/UpdatePassword'
import ForgotPassword                    from './components/user/ForgotPassword'
import NewPassword                       from './components/user/NewPassword'
// Cart Imports 
import Cart                              from './components/cart/Cart'
import Shipping                          from './components/cart/Shipping'
import ConfirmOrder                      from './components/cart/ConfirmOrder'
import Payment                           from './components/cart/Payment'
import OrderSuccess                      from './components/cart/OrderSuccess'
// Order Imports 
import ListOrders                        from './components/order/ListOrders'
import OrderDetails                      from './components/order/OrderDetails'
// Admin Imports 
import Dashboard                         from './components/admin/Dashboard'
// Admin Product Imports 
import ProductsList                      from './components/admin/products/ProductsList'
import NewProduct                        from './components/admin/products/NewProduct'
import UpdateProduct                     from './components/admin/products/UpdateProduct'
import ProductReviews                    from './components/admin/products/ProductReviews'
// Admin Order Imports 
import OrdersList                        from './components/admin/orders/OrdersList'
import ProcessOrder                      from './components/admin/orders/ProcessOrder'
// Admin User Imports 
import UsersList                         from './components/admin/users/UsersList'
import UpdateUser                        from './components/admin/users/UpdateUser'
// Admin Category 1 Imports 
import CategoryOneList                   from './components/admin/categoryOne/CategoryOneList'
import NewCategoryOne                    from './components/admin/categoryOne/NewCategoryOne'
import UpdateCategoryOne                 from './components/admin/categoryOne/UpdateCategoryOne'
// Admin Category 2 Imports 
import CategoryTwoList                   from './components/admin/categoryTwo/CategoryTwoList'
import NewCategoryTwo                    from './components/admin/categoryTwo/NewCategoryTwo'
import UpdateCategoryTwo                 from './components/admin/categoryTwo/UpdateCategoryTwo'
// Admin Category 3 Imports 
import CategoryThreeList                 from './components/admin/categoryThree/CategoryThreeList'
import NewCategoryThree                  from './components/admin/categoryThree/NewCategoryThree'
import UpdateCategoryThree               from './components/admin/categoryThree/UpdateCategoryThree'

function App() {  

  const location = useLocation()

  const [ stripeApiKey,    setStripeApiKey    ] = useState('')

  const { loggingOut } = useSelector(state => state.auth)
       
  const redirect = loggingOut ? true : false

  useEffect(() => {

    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey()
    
  }, [])  

  const transitions = useTransition( location, {
    from:  { opacity: 0,   transform: "translate( 100%, 0%)" },
    enter: { opacity: 1,   transform: "translate(   0%, 0%)" },
    leave: { opacity: 0.5, transform: "translate(-100%, 0%)", position: "absolute", top: "90px", width: "100%" }
  })  

  const categoryOnePath   = process.env.REACT_APP_CATEGORY_ONE.toLowerCase().replace(/ /g, '-')
  const categoryTwoPath   = process.env.REACT_APP_CATEGORY_TWO.toLowerCase().replace(/ /g, '-')
  const categoryThreePath = process.env.REACT_APP_CATEGORY_THREE.toLowerCase().replace(/ /g, '-')

  return (    
    
    <Fragment>

      <Header />        

      {transitions((props, item) => (      
        <animated.main style={props}>

        {stripeApiKey && 
        <Elements stripe={location.pathname === '/payment' ? loadStripe(stripeApiKey) : null}>

          <ScrollToTop />
          
          <Routes location={redirect ? null : item}>

            <Route path="/"                      element={<Home                                                         />} />
            
            <Route path="/gallery"               element={<Gallery                                                      />} />
            <Route path="/gallery/:keyword"      element={<Gallery                                                      />} />
            <Route path={`/gallery/${categoryOnePath}/:${categoryOnePath}`} element={<Gallery                                                     />} />
            <Route path={`/gallery/${categoryTwoPath}/:${categoryTwoPath}`} element={<Gallery                                           />} />
            <Route path={`/gallery/${categoryThreePath}/:${categoryThreePath}`} element={<Gallery                                                     />} />
            <Route path="/gallery/rating/:rating" element={<Gallery                                                     />} />
            <Route path="/product/:slug"         element={<ProductDetails                                               />} />             
            
            <Route path="/terms"                 element={<Terms                                                        />} />
            <Route path="/privacy"               element={<Privacy                                                      />} />
            
            <Route path="/login"                 element={<Login                                                        />} />
            <Route path="/register"              element={<Register                                                     />} />  
            <Route path="/password/forgot"       element={<ForgotPassword                                               />} />
            <Route path="/password/reset/:token" element={<NewPassword                                                  />} /> 
            <Route path="/me"                    element={<PrivateRoute><Profile                         /></PrivateRoute>} />           
            <Route path="/me/update"             element={<PrivateRoute><UpdateProfile                   /></PrivateRoute>} />
            <Route path="/password/update"       element={<PrivateRoute><UpdatePassword                  /></PrivateRoute>} />
           
            <Route path="/cart"                  element={<Cart                                                         />} />
            <Route path="/shipping"              element={<PrivateRoute><Shipping                        /></PrivateRoute>} />
            <Route path="/order/confirm"         element={<PrivateRoute><ConfirmOrder                    /></PrivateRoute>} />                                
            <Route path="/payment"               element={<PrivateRoute><Payment                         /></PrivateRoute>} />            
            <Route path="/success"               element={<PrivateRoute><OrderSuccess                    /></PrivateRoute>} />
            
            <Route path="/orders/me"             element={<PrivateRoute><ListOrders                      /></PrivateRoute>} />
            <Route path="/order/:id"             element={<PrivateRoute><OrderDetails                    /></PrivateRoute>} />

            <Route path="/admin/dashboard"       element={<PrivateRoute isAdmin={true}><Dashboard        /></PrivateRoute>} />
            
            <Route path="/admin/products"        element={<PrivateRoute isAdmin={true}><ProductsList     /></PrivateRoute>} />                
            <Route path="/admin/product"         element={<PrivateRoute isAdmin={true}><NewProduct       /></PrivateRoute>} />
            <Route path="/admin/product/:id"     element={<PrivateRoute isAdmin={true}><UpdateProduct    /></PrivateRoute>} />
            
            <Route path="/admin/orders"          element={<PrivateRoute isAdmin={true}><OrdersList       /></PrivateRoute>} />
            <Route path="/admin/order/:id"       element={<PrivateRoute isAdmin={true}><ProcessOrder     /></PrivateRoute>} />
            
            <Route path="/admin/users"           element={<PrivateRoute isAdmin={true}><UsersList        /></PrivateRoute>} />
            <Route path="/admin/user/:id"        element={<PrivateRoute isAdmin={true}><UpdateUser       /></PrivateRoute>} />
            
            <Route path="/admin/reviews"         element={<PrivateRoute isAdmin={true}><ProductReviews   /></PrivateRoute>} />
            
            <Route path={`/admin/${categoryOnePath}s`}      element={<PrivateRoute isAdmin={true}><CategoryOneList     /></PrivateRoute>} />
            <Route path={`/admin/${categoryOnePath}`}       element={<PrivateRoute isAdmin={true}><NewCategoryOne      /></PrivateRoute>} />
            <Route path={`/admin/${categoryOnePath}/:id`}   element={<PrivateRoute isAdmin={true}><UpdateCategoryOne   /></PrivateRoute>} />
            
            <Route path={`/admin/${categoryTwoPath}s`}      element={<PrivateRoute isAdmin={true}><CategoryTwoList     /></PrivateRoute>} />
            <Route path={`/admin/${categoryTwoPath}`}       element={<PrivateRoute isAdmin={true}><NewCategoryTwo      /></PrivateRoute>} />
            <Route path={`/admin/${categoryTwoPath}/:id`}   element={<PrivateRoute isAdmin={true}><UpdateCategoryTwo   /></PrivateRoute>} />
            
            <Route path={`/admin/${categoryThreePath}s`}    element={<PrivateRoute isAdmin={true}><CategoryThreeList   /></PrivateRoute>} />
            <Route path={`/admin/${categoryThreePath}`}     element={<PrivateRoute isAdmin={true}><NewCategoryThree    /></PrivateRoute>} />
            <Route path={`/admin/${categoryThreePath}/:id`} element={<PrivateRoute isAdmin={true}><UpdateCategoryThree /></PrivateRoute>} />
         
          </Routes>   

        </Elements>
        
        }        

        </animated.main>     

      ))}  

      <Footer /> 
    
    </Fragment>

  )
  
}

export default App
