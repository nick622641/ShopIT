import axios from 'axios'
import {     
    ALL_CATEGORY_ONES_REQUEST,
    ALL_CATEGORY_ONES_SUCCESS,
    ALL_CATEGORY_ONES_FAIL,
    CATEGORY_ONE_DETAILS_REQUEST,
    CATEGORY_ONE_DETAILS_SUCCESS,
    CATEGORY_ONE_DETAILS_FAIL,    
    NEW_CATEGORY_ONE_REQUEST,
    NEW_CATEGORY_ONE_SUCCESS,
    NEW_CATEGORY_ONE_FAIL,
    DELETE_CATEGORY_ONE_REQUEST,
    DELETE_CATEGORY_ONE_SUCCESS,
    DELETE_CATEGORY_ONE_FAIL,
    UPDATE_CATEGORY_ONE_REQUEST,
    UPDATE_CATEGORY_ONE_SUCCESS,
    UPDATE_CATEGORY_ONE_FAIL,
    ALL_CATEGORY_TWOS_REQUEST,
    ALL_CATEGORY_TWOS_SUCCESS,
    ALL_CATEGORY_TWOS_FAIL,
    CATEGORY_TWO_DETAILS_REQUEST,
    CATEGORY_TWO_DETAILS_SUCCESS,
    CATEGORY_TWO_DETAILS_FAIL,    
    NEW_CATEGORY_TWO_REQUEST,
    NEW_CATEGORY_TWO_SUCCESS,
    NEW_CATEGORY_TWO_FAIL,
    DELETE_CATEGORY_TWO_REQUEST,
    DELETE_CATEGORY_TWO_SUCCESS,
    DELETE_CATEGORY_TWO_FAIL,
    UPDATE_CATEGORY_TWO_REQUEST,
    UPDATE_CATEGORY_TWO_SUCCESS,
    UPDATE_CATEGORY_TWO_FAIL,
    ALL_CATEGORY_THREES_REQUEST,
    ALL_CATEGORY_THREES_SUCCESS,
    ALL_CATEGORY_THREES_FAIL,
    CATEGORY_THREE_DETAILS_REQUEST,
    CATEGORY_THREE_DETAILS_SUCCESS,
    CATEGORY_THREE_DETAILS_FAIL,    
    NEW_CATEGORY_THREE_REQUEST,
    NEW_CATEGORY_THREE_SUCCESS,
    NEW_CATEGORY_THREE_FAIL,
    DELETE_CATEGORY_THREE_REQUEST,
    DELETE_CATEGORY_THREE_SUCCESS,
    DELETE_CATEGORY_THREE_FAIL,
    UPDATE_CATEGORY_THREE_REQUEST,
    UPDATE_CATEGORY_THREE_SUCCESS,
    UPDATE_CATEGORY_THREE_FAIL, 
    CLEAR_ERRORS
} from '../constants/categoryConstants'

// Get all Category Ones
export const getCategoryOnes = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_ONES_REQUEST })    
        const { data } = await axios.get('/api/v1/category1')
        dispatch({
            type: ALL_CATEGORY_ONES_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_ONES_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category One Details
export const getCategoryOneDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_ONE_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category1/${id}`)
        dispatch({
            type: CATEGORY_ONE_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORY_ONE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category One (Admin)
export const newCategoryOne = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORY_ONE_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category1/new', formData )
        dispatch({
            type: NEW_CATEGORY_ONE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_ONE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category One (Admin)
export const updateCategoryOne = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORY_ONE_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category1/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORY_ONE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_ONE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category One (Admin)
export const deleteCategoryOne = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORY_ONE_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category1/${id}` )
        dispatch({
            type: DELETE_CATEGORY_ONE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_ONE_FAIL,
            payload: error.response.data.message
        })
    }

}

// Get Category Twos
export const getCategoryTwos = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_TWOS_REQUEST })    
        const { data } = await axios.get('/api/v1/category2')
        dispatch({
            type: ALL_CATEGORY_TWOS_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_TWOS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category Two Details
export const getCategoryTwoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type:CATEGORY_TWO_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category2/${id}`)
        dispatch({
            type:CATEGORY_TWO_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORY_TWO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category Two (Admin)
export const newCategoryTwo = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORY_TWO_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category2/new', formData )
        dispatch({
            type: NEW_CATEGORY_TWO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_TWO_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category Two (Admin)
export const updateCategoryTwo = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORY_TWO_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category2/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORY_TWO_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_TWO_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category Two (Admin)
export const deleteCategoryTwo = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORY_TWO_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category2/${id}` )
        dispatch({
            type: DELETE_CATEGORY_TWO_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_TWO_FAIL,
            payload: error.response.data.message
        })
    }

}

// Get Category Threes
export const getCategoryThrees = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_THREES_REQUEST })    
        const { data } = await axios.get('/api/v1/category3')
        dispatch({
            type: ALL_CATEGORY_THREES_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_THREES_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category Three Details
export const getCategoryThreeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_THREE_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category3/${id}`)
        dispatch({
            type: CATEGORY_THREE_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORY_THREE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category Three (Admin)
export const newCategoryThree = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORY_THREE_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category3/new', formData )
        dispatch({
            type: NEW_CATEGORY_THREE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_THREE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category Three (Admin)
export const updateCategoryThree = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORY_THREE_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category3/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORY_THREE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_THREE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category Three (Admin)
export const deleteCategoryThree = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORY_THREE_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category3/${id}` )
        dispatch({
            type: DELETE_CATEGORY_THREE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_THREE_FAIL,
            payload: error.response.data.message
        })
    }

}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}