import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_CATEGORY_TWO_RESET } from '../../../constants/categoryConstants'
import { newCategoryTwo, clearErrors } from '../../../actions/categoryActions'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, IconButton, TextField, Tooltip } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const NewCategoryTwo = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ name,       setName       ] = useState('')  
    const [ slug,       setSlug       ] = useState('')
    const [ fullscreen, setFullscreen ] = useState(false)

    const { loading, error, success } = useSelector( state => state.newCategoryTwo )

    const categoryTwoPath = process.env.REACT_APP_CATEGORY_TWO.toLowerCase().replace(/ /g, '-') 

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success(`${process.env.REACT_APP_CATEGORY_TWO} Created Successfully`)
            navigate(`/admin/${categoryTwoPath}s`)
            dispatch({ type: NEW_CATEGORY_TWO_RESET })            
        }
    }, [dispatch, navigate, alert, error, success, categoryTwoPath])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)  
        formData.set('slug', slug)      
        dispatch(newCategoryTwo(formData))
    }   

    const sanitizeInput = (value) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        setSlug(value.toLowerCase())
    }

    return (

        <Fragment>

            <MetaData title={`New ${process.env.REACT_APP_CATEGORY_TWO}`} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>         
                            
                        <div className="user-form cart"> 

                            <h1>New {process.env.REACT_APP_CATEGORY_TWO}</h1>   

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label={`${process.env.REACT_APP_CATEGORY_TWO} Name`} 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            sanitizeInput(e.target.value)
                                        }} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label="Url Slug - (Read Only)"
                                        variant="filled"
                                        value={slug}
                                        disabled={true}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>

                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                    disabled={ !name ? true : false }
                                >
                                    Create
                                </LoadingButton>   

                            </form>
                   
                            <Link to={`/admin/${categoryTwoPath}s`}>
                                <Fab 
                                    size="small" 
                                    className="close" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>
                            </Link>

                            <Tooltip title="Expand">
                                <IconButton 
                                    color="primary" 
                                    sx={{ position: 'absolute', top: 10, left: 10 }}
                                    onClick={() => setFullscreen(!fullscreen)}
                                >
                                    <FitScreenIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>

    )
    
}

export default NewCategoryTwo
