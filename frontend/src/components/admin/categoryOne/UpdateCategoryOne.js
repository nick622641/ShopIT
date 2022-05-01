import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_CATEGORY_ONE_RESET } from '../../../constants/categoryConstants'
import { getCategoryOneDetails, updateCategoryOne, clearErrors } from '../../../actions/categoryActions'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import { FormControl, TextField, Tooltip } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const UpdateCategoryOne = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [ name,       setName       ] = useState('')  
    const [ oldSlug,    setOldSlug    ] = useState('')
    const [ slug,       setSlug       ] = useState('')
    const [ fullscreen, setFullscreen ] = useState(false)

    const { error, categoryOne                     } = useSelector(state => state.categoryOneDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.categoryOne)

    const categoryOnePath = process.env.REACT_APP_CATEGORY_ONE.toLowerCase().replace(/ /g, '-') 

    useEffect(() => { 
        
        if (categoryOne && categoryOne._id !== id) {
            dispatch(getCategoryOneDetails(id))
        } else {
            setName(categoryOne.name)
            setOldSlug(categoryOne.slug)
            setSlug(categoryOne.slug)
        }
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated) {            
            alert.success(`${process.env.REACT_APP_CATEGORY_ONE} Updated Successfully`)
            dispatch(getCategoryOneDetails(id))
            navigate(`/admin/${categoryOnePath}s`)
            dispatch({ type: UPDATE_CATEGORY_ONE_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, categoryOne, id, categoryOnePath])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('oldSlug', oldSlug)       
        formData.set('slug', slug)       
        dispatch(updateCategoryOne(categoryOne._id, formData))
    }   

    const sanitizeInput = (value) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        setSlug(value.toLowerCase())
    }

    return (

        <Fragment>

            <MetaData title={`Update ${process.env.REACT_APP_CATEGORY_ONE}`} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>        
                            
                        <div className="user-form cart"> 

                            <h1>Update {process.env.REACT_APP_CATEGORY_ONE}</h1>   

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label={`${process.env.REACT_APP_CATEGORY_ONE} Name`} 
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
                                    Update
                                </LoadingButton> 

                            </form>
                   
                            <Link to={`/admin/${categoryOnePath}s`}>
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

export default UpdateCategoryOne
