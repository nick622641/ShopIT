import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_CATEGORY_THREE_RESET } from '../../../constants/categoryConstants'
import { getCategoryThreeDetails, updateCategoryThree, clearErrors } from '../../../actions/categoryActions'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField, Tooltip } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const UpdateCategoryThree = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ name,       setName       ] = useState('')  
    const [ oldName,    setOldName    ] = useState('')
    const [ fullscreen, setFullscreen ] = useState(false)

    const { error, categoryThree                   } = useSelector(state => state.categoryThreeDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.categoryThree)

    useEffect(() => { 

        if (categoryThree && categoryThree._id !== id) {
            dispatch(getCategoryThreeDetails(id))
        } else {
            setName(categoryThree.name)
            setOldName(categoryThree.name)
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
            alert.success(`${process.env.REACT_APP_CATEGORY_THREE} Updated Successfully`)
            dispatch(getCategoryThreeDetails(id))
            navigate(`/admin/categoryThrees`)
            dispatch({ type: UPDATE_CATEGORY_THREE_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, categoryThree, id])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)  
        formData.set('oldName', oldName)  
        dispatch(updateCategoryThree(categoryThree._id, formData))
    }  
  
    return (

        <Fragment>

            <MetaData title={`Update ${process.env.REACT_APP_CATEGORY_THREE}`} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>      
                            
                        <div className="user-form cart"> 

                            <h1>Update {process.env.REACT_APP_CATEGORY_THREE}</h1>     

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
                                    Update
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

export default UpdateCategoryThree
