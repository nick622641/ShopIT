import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import CookieConsent from 'react-cookie-consent'

const Footer = () => {  

    return (

        <Fragment>

            <footer>   

                <small>Copyright &copy; <b>{process.env.REACT_APP_SITE_NAME}</b> <span className="primary-color">{new Date().getFullYear()}</span>. All Rights Reserved.</small>
                
                <CookieConsent
                    buttonStyle={{ backgroundColor: "var(--primary-color)", color: "white" }}
                    buttonText="OK Great!"
                    expires={365}
                    style={{ background: "var(--secondary-color)" }}
                >
                    <p>This site uses cookies. See our&nbsp;
                        <Link style={{ color: "#aaaaaa", textDecoration: "underline" }} to="/privacy">Privacy Policy</Link> for details.

                    </p>                    
                </CookieConsent>

            </footer>

            <ScrollToTop 
                smooth 
                top={500}
                style={{ background: 'none', boxShadow: 'none' }} 
                component={<ArrowCircleUpIcon color="primary" fontSize="large" />} 
            />

        </Fragment>

    )
    
}

export default Footer
