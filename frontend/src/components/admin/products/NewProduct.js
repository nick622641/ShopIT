import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { newProduct, clearErrors } from '../../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants'
import { getCategoryOnes, getCategoryTwos, getCategoryThrees } from '../../../actions/categoryActions'
import { FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'
import Loader from '../../layouts/Loader'

const NewProduct = () => {

    const alert    = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ name,              setName              ] = useState('')
    const [ serial,            setSerial            ] = useState('')
    const [ slug,              setSlug              ] = useState('')
    const [ price,             setPrice             ] = useState('')
    const [ width,             setWidth             ] = useState('')
    const [ height,            setHeight            ] = useState('')
    const [ depth,             setDepth             ] = useState('')
    const [ description,       setDescription       ] = useState('')
    const [ categoryOne,       setCategoryOne       ] = useState('')
    const [ categoryOneSlug,   setCategoryOneSlug   ] = useState('')
    const [ categoryTwo,       setCategoryTwo       ] = useState('')
    const [ categoryTwoSlug,   setCategoryTwoSlug   ] = useState('')
    const [ categoryThree,     setCategoryThree     ] = useState('')
    const [ categoryThreeSlug, setCategoryThreeSlug ] = useState('')
    const [ stock,             setStock             ] = useState('')
    const [ visible,           setVisible           ] = useState(0)
    const [ datePublished,     setDatePublished     ] = useState(Date.now())
    const [ images,            setImages            ] = useState([])
    const [ imagesPreview,     setImagesPreview     ] = useState([])
    const [ fullscreen,        setFullscreen        ] = useState(false)    
    
    const { loading, error, success } = useSelector( state => state.newProduct )
    const { categoryOnes            } = useSelector( state => state.categoryOnes )
    const { categoryTwos            } = useSelector( state => state.categoryTwos )
    const { categoryThrees          } = useSelector( state => state.categoryThrees )

    useEffect(() => {
        
        dispatch(getCategoryOnes())        
        dispatch(getCategoryTwos())  
        dispatch(getCategoryThrees())      

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Product Created Successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
            navigate('/admin/products')
        }
    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('serial', serial)
        formData.set('slug', slug)
        formData.set('price', price)
        formData.set('width', width)
        formData.set('height', height)
        formData.set('depth', depth)
        formData.set('description', description)
        formData.set('categoryOne', categoryOne)
        formData.set('categoryOneSlug', categoryOneSlug)
        formData.set('categoryTwo', categoryTwo)
        formData.set('categoryTwoSlug', categoryTwoSlug)
        formData.set('categoryThree', categoryThree)
        formData.set('categoryThreeSlug', categoryThreeSlug)
        formData.set('stock', stock)
        formData.set('visible', visible)
        formData.set('datePublished', datePublished)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newProduct( urlencodeFormData(formData) ))
    }

    const onChange = (e) => {
        
        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })   
    } 
    
    const urlencodeFormData = ( formData ) => {
        const params = new URLSearchParams()
        for( let pair of formData.entries() ) {
            typeof pair[1]=='string' && params.append( pair[0], pair[1] )
        }
        return params.toString()
    }

    const sanitizeInput = (value, type) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        if(type === 'name')          setSlug(value.toLowerCase())
        if(type === 'categoryOne')   setCategoryOneSlug(value.toLowerCase())
        if(type === 'categoryTwo')   setCategoryTwoSlug(value.toLowerCase())
        if(type === 'categoryThree') setCategoryThreeSlug(value.toLowerCase())
    }

    return (

        <Fragment>

            <MetaData title={'New Product'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'relative fullscreen' : 'relative'}>  

                        {loading ? <Loader /> : (  

                            <Fragment>

                            <div className="user-form"> 

                                <form onSubmit={submitHandler} encType='multipart/form-data'>

                                    <FormControl fullWidth>
                                        <TextField 
                                            label="Product Name" 
                                            required
                                            value={name}
                                            variant="standard"
                                            onChange={(e) => {
                                                setName(e.target.value)
                                                sanitizeInput(e.target.value, 'name')
                                            }} 
                                            sx={{ mb: 1 }}
                                        />                                 
                                    </FormControl>

                                    <div className="parent reverse">

                                        <div>

                                            <label>                                        
                                                <input
                                                    type="file"   
                                                    className="hidden-input"
                                                    name="product_images"                            
                                                    onChange={onChange}   
                                                    multiple                              
                                                /> 
                                                <Avatar
                                                    src={imagesPreview[0] ? imagesPreview[0] : '/images/default-product.jpg'} 
                                                    alt='Avatar Preview' 
                                                    sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                                /> 
                                            </label> 

                                            <FormControlLabel 
                                                control={
                                                    <Checkbox 
                                                        size="small"
                                                        value={visible}
                                                        onChange={(e) => setVisible(e.target.checked ? 1 : 0 )}
                                                        checked={visible === 1 ? true : false}
                                                    />
                                                } 
                                                label={visible === 1 ? 'Published' : 'Draft'} 
                                            /> 

                                        </div>

                                        <div>  
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

                                            <FormControl fullWidth>
                                                <TextField 
                                                    label="Serial" 
                                                    value={serial}
                                                    variant="standard"
                                                    onChange={(e) => setSerial(e.target.value)} 
                                                />                                 
                                            </FormControl>

                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <TextField 
                                                    label="Stock" 
                                                    required
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    type="number"
                                                    value={stock} 
                                                    variant="standard"
                                                    onChange={(e) => setStock(e.target.value)}
                                                />                                 
                                            </FormControl>
                                        
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <TextField 
                                                    label="Price THB" 
                                                    required
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    type="number"
                                                    value={price} 
                                                    variant="standard"
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />                                 
                                            </FormControl>                                               
                                        
                                            <FormControl fullWidth sx={{ mb: 1 }}>                                            
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>                                                        
                                                    <DesktopDatePicker    
                                                        label="Date Added"
                                                        inputFormat="dd/MM/yyyy"
                                                        format="dd/MM/yyyy"
                                                        value={datePublished}
                                                        onChange={(newValue) => setDatePublished(newValue)} 
                                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>    
                                        </div>                         
                                        
                                    </div>                                
                                    
                                    {imagesPreview.length > 0 && (
                                        <ul className="d-flex">
                                            {imagesPreview.map(img => (
                                                <li 
                                                    key={img} 
                                                    className="relative round background-cover" 
                                                    style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img})` }}
                                                >                                           
                                                </li>
                                            ))} 
                                        </ul> 
                                    )}                                     
                                
                                    <h4>Dimensions <small>&bull; (cm)</small></h4>

                                    <div className="d-flex">
                                    
                                        <FormControl fullWidth sx={{ mr: 2 }}>
                                            <TextField 
                                                label="Width" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={width} 
                                                variant="standard"
                                                onChange={(e) => setWidth(e.target.value)}
                                            />                                 
                                        </FormControl>
                                    
                                        <FormControl fullWidth sx={{ mr: 2 }}>
                                            <TextField 
                                                label="Height" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={height} 
                                                variant="standard"
                                                onChange={(e) => setHeight(e.target.value)}
                                            />                                 
                                        </FormControl>
                                                                        
                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Depth" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={depth} 
                                                variant="standard"
                                                onChange={(e) => setDepth(e.target.value)}
                                            />                                 
                                        </FormControl>   

                                    </div>

                                    <h4>Categories</h4>  

                                    {categoryOnes.length > 0 && (
                                        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                            <InputLabel>{process.env.REACT_APP_CATEGORY_ONE}</InputLabel>
                                            <Select 
                                                value={categoryOne}
                                                onChange={(e) => {
                                                    setCategoryOne(e.target.value)
                                                    sanitizeInput(e.target.value, 'categoryOne')
                                                }}                                             
                                            >
                                                {categoryOnes.map(categoryOne => (                                
                                                    <MenuItem 
                                                        key={categoryOne._id} 
                                                        value={categoryOne.name}
                                                    >  
                                                        {categoryOne.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl> 
                                    )}

                                    {categoryTwos.length > 0 && (
                                        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                            <InputLabel>{process.env.REACT_APP_CATEGORY_TWO}</InputLabel>
                                            <Select 
                                                value={categoryTwo}
                                                onChange={(e) => {
                                                    setCategoryTwo(e.target.value)
                                                    sanitizeInput(e.target.value, 'categoryTwo')
                                                }}                                             
                                            >
                                                {categoryTwos.map(categoryTwo => (                                
                                                    <MenuItem key={categoryTwo._id} value={categoryTwo.name}>  
                                                        {categoryTwo.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl> 
                                    )}                                                                

                                    {categoryThrees.length > 0 && (
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>{process.env.REACT_APP_CATEGORY_THREE}</InputLabel>
                                            <Select 
                                                value={categoryThree}
                                                onChange={(e) => {
                                                    setCategoryThree(e.target.value)
                                                    sanitizeInput(e.target.value, 'categoryThree')
                                                }}                                             
                                            >
                                                {categoryThrees.map(categoryThree => (                                
                                                    <MenuItem key={categoryThree._id} value={categoryThree.name}>  
                                                        {categoryThree.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl>   
                                    )}                                

                                    <h4>Description</h4> 

                                    <RichtextEditor text={description} setText={setDescription} />   

                                    <RichtextPreview text={description} />                           

                                    <LoadingButton 
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="contained" 
                                        type="submit"
                                        endIcon={<SendIcon />}
                                        sx={{ mt: 4, width: '100%' }}
                                        disabled={!name || !price || !description || !categoryOne || !stock || !images ? true : false}
                                    >
                                        Create
                                    </LoadingButton>

                                </form>

                                <Link to="/admin/dashboard">
                                    <Fab 
                                        size="small" 
                                        color="primary"
                                        sx={{ position: 'absolute', top: 10, right: 10 }}
                                    >
                                        <CloseIcon />
                                    </Fab>
                                </Link>

                                <Tooltip title="Expand">
                                    <IconButton 
                                        sx={{ position: 'absolute', top: 10, left: 10 }}
                                        onClick={() => setFullscreen(!fullscreen)}
                                    >
                                        <FitScreenIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            </Fragment>
                        )}   
                        
                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default NewProduct
