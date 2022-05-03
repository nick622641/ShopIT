import { Button, Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'

const Product = ({ product }) => {

    return (
        
        <Link to={`/product/${product.slug}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={product.images[0].thumbUrl} 
                        alt={product.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h4 
                    className="text-center"
                    style={{ margin: 0, padding: "0 10px", flex: "0 0 70px" }}
                >
                    {product.name}
                </h4> 

                <div className="text-center">

                    <div 
                        className="d-flex align-items-center"
                        style={{ marginBottom: "10px" }}
                    >
                        <Rating                                                            
                            value={product.ratings} 
                            sx={{ color: "var(--primary-color)" }} 
                            precision={0.5} 
                            readOnly 
                        />
                        <small>
                            ({product.numOfReviews})
                        </small> 
                    </div> 
                    <b>
                        {product.stock > 0 
                            ? <FormattedPrice number={product.price} /> 
                            : 'Out of Stock'
                        }                    
                    </b> 

                </div>   

                <Button 
                    variant="contained" 
                    sx={{ width: 'calc(100% - 20px)', color: "white", mt: 2 }}
                >
                    View Details
                </Button>                     
                                       
            </div>

        </Link>

    )

}

export default Product
