import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_CATEGORY_THREE_RESET } from '../../../constants/categoryConstants'
import { newCategoryThree, clearErrors } from '../../../actions/categoryActions'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import { FormControl, TextField, Tooltip } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const NewCategoryThree = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ name,       setName       ] = useState('')  
    const [ fullscreen, setFullscreen ] = useState(false)

    const { loading, error, success } = useSelector(state => state.newCategoryThree)

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success(`${process.env.REACT_APP_CATEGORY_THREE} Created Successfully`)
            navigate(`/admin/categoryThrees`)
            dispatch({ type: NEW_CATEGORY_THREE_RESET })            
        }
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)  
        dispatch(newCategoryThree(formData))
    }   

    return (

        <Fragment>

            <MetaData title={`New ${process.env.REACT_APP_CATEGORY_THREE}`} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>       
                            
                        <div className="user-form cart"> 

                            <h1>New {process.env.REACT_APP_CATEGORY_THREE}</h1>   

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label={`${process.env.REACT_APP_CATEGORY_THREE} Name`} 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)} 
                                        sx={{ mb: 1 }}
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
                   
                            <Link to={`/admin/categoryThrees`}>
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

export default NewCategoryThree
