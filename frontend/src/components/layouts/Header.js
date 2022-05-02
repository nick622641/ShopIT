import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector             } from 'react-redux'
import { useSpring, animated                  } from 'react-spring'
import { useAlert                             } from 'react-alert'
import { Link, useNavigate                    } from 'react-router-dom'
import { logout                               } from '../../actions/userActions'
import { styled                               } from '@mui/material/styles'
import { Tooltip                              } from '@mui/material'
import IconButton                               from '@mui/material/IconButton'
import MoreVertIcon                             from '@mui/icons-material/MoreVert'
import ShoppingBasketIcon                       from '@mui/icons-material/ShoppingBasket'
import PersonOutlineIcon                        from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon                         from '@mui/icons-material/ShoppingCart'
import EmailIcon                                from '@mui/icons-material/Email'
import SpeedIcon                                from '@mui/icons-material/Speed'
import SearchIcon                               from '@mui/icons-material/Search'
import LogoutIcon                               from '@mui/icons-material/Logout'
import LoginIcon                                from '@mui/icons-material/Login'
import Backdrop                                 from '@mui/material/Backdrop'
import Avatar                                   from '@mui/material/Avatar'
import Badge                                    from '@mui/material/Badge'
import Modal                                    from '../modals/Modal'
import Contact                                  from '../modals/Contact'
import Search                                   from './Search'
import './layout.css'

const Header = () => {    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert    = useAlert()
   
    const { user, loading } = useSelector( state => state.auth )
    const { cartItems     } = useSelector( state => state.cart )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ isMenuVisible,   setMenuVisible    ] = useState(false)
    const [ isMenuOpen,      setIsMenuOpen     ] = useState(false)  
    const [ isSearchVisible, setSearchVisible  ] = useState(false)
    const [ fixed,           setFixed          ] = useState(false)
    
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            border: '2px solid white',
            padding: '0 4px',
            backgroundColor: 'var(--primary-color)'
        },
    }))

    const logoutHandler = () => {
        dispatch(logout())
        setMenuVisible(false)
        alert.success('Logged Out Successfully')
    }
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    } 
    const toggleMenu = () => {
        setMenuVisible(isMenuVisible => !isMenuVisible)
    } 
    const toggleSearch = () => {
        setSearchVisible(isSearchVisible => !isSearchVisible)
    }   
    const menuAppear = useSpring({
        transform: isMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isMenuVisible ? 1 : 0
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', () =>
            setFixed(window.scrollY  > 400)
          )
          return () => {
            window.removeEventListener('scroll', setFixed)
          }
        }
    }, [])         
    
    return (

        <Fragment>

            <Backdrop
                sx={{ zIndex: 1 }}
                open={isMenuOpen}
                onClick={() => setIsMenuOpen(false)}
            /> 

            <header className={fixed ? 'fixed' : ''}>   

                <div className="container">

                    <div className="header-wrapper">

                        <div className="parent">

                            <div className="d-flex align-items-center">  
                                <Link to="/gallery">
                                    <IconButton style={{ marginLeft: "-20px" }}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Link>                         
                                <Tooltip title="Home" arrow>
                                    <Link to="/">
                                        <img src="/images/shopit_logo.png" alt="Logo" className="logo" />
                                    </Link>
                                </Tooltip>
                            </div>
                            
                            <Search isSearchVisible={isSearchVisible} />  

                            <div className="relative d-flex icons justify-content-center">   

                                <Tooltip title="Search" arrow>
                                    <IconButton 
                                        onClick={toggleSearch} 
                                        className="mobile-menu"
                                    >
                                        <SearchIcon className="header-icon" fontSize="large" />
                                    </IconButton>
                                </Tooltip>                                                                   
                                <Tooltip title="Cart" arrow>
                                    <IconButton onClick={() => navigate('/cart')}>                                    
                                        <StyledBadge                             
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={cartItems.length} 
                                        >
                                            <ShoppingCartIcon className="header-icon" />
                                        </StyledBadge>                                    
                                    </IconButton>   
                                </Tooltip>
                                <Tooltip title="Contact Us" arrow>
                                    <IconButton onClick={toggleModal}>                                    
                                            <EmailIcon className="header-icon" />                                    
                                    </IconButton>  
                                </Tooltip>            

                                {user ? (
                                    <Fragment>
                                        <div className="relative">  
                                            <Tooltip title="My Account" arrow>
                                                <IconButton onClick={() => toggleMenu()}>                                                  
                                                    <Avatar 
                                                        alt={user && user.name} 
                                                        src={user.avatar && user.avatar.url}   
                                                        sx={{ width: 28, height: 28 }}                                      
                                                    />
                                                </IconButton>  
                                            </Tooltip> 
                                            <small className="whitespace-nowrap name">
                                                {user && user.name}
                                            </small>                            
                                        </div>
                                        {isMenuVisible && ( 
                                        <Fragment>

                                        <Backdrop
                                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            invisible={true}
                                            open={isMenuVisible}
                                            onClick={toggleMenu}
                                        /> 

                                        <animated.div className="dropdown-menu" style={menuAppear}>

                                            {user && user.role === 'admin' && (
                                                <Link to="/admin/dashboard" onClick={toggleMenu}>
                                                    Dashboard &nbsp;
                                                    <IconButton>
                                                        <SpeedIcon color="secondary" />
                                                    </IconButton>
                                                </Link>
                                            )}

                                            <Link to="/me" onClick={toggleMenu}>
                                                Profile &nbsp; 
                                                <IconButton>
                                                    <PersonOutlineIcon color="secondary" />
                                                </IconButton>
                                            </Link>

                                            <Link to="/orders/me" onClick={toggleMenu}>
                                                Orders &nbsp; 
                                                <IconButton>
                                                    <ShoppingBasketIcon color="secondary" />
                                                </IconButton>
                                            </Link>
                                            
                                            <Link to="/" onClick={logoutHandler}>
                                                Logout &nbsp; 
                                                <IconButton>
                                                    <LogoutIcon color="secondary" />
                                                </IconButton>
                                            </Link>

                                        </animated.div>
                                        </Fragment>
                                        )}
                                    </Fragment>
                                ) : !loading && (
                                    <Link to="/login">
                                        <Tooltip title="Login" arrow>
                                            <IconButton>
                                                <LoginIcon className="header-icon" />
                                            </IconButton>
                                        </Tooltip> 
                                    </Link>
                                )}                                  

                                <Modal
                                    isModalVisible={isModalVisible} 
                                    onBackdropClick={toggleModal}   
                                    content={ <Contact /> }
                                />

                            </div> 

                        </div>                        

                    </div>

                </div>                   

            </header>             
            
        </Fragment>

    )
    
}

export default Header
