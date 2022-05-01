import {     
    ALL_CATEGORY_ONES_REQUEST,
    ALL_CATEGORY_ONES_SUCCESS,
    ALL_CATEGORY_ONES_FAIL,
    CATEGORY_ONE_DETAILS_REQUEST,
    CATEGORY_ONE_DETAILS_SUCCESS,
    CATEGORY_ONE_DETAILS_FAIL,    
    NEW_CATEGORY_ONE_REQUEST,
    NEW_CATEGORY_ONE_SUCCESS,
    NEW_CATEGORY_ONE_RESET,
    NEW_CATEGORY_ONE_FAIL,
    DELETE_CATEGORY_ONE_REQUEST,
    DELETE_CATEGORY_ONE_SUCCESS,
    DELETE_CATEGORY_ONE_RESET,
    DELETE_CATEGORY_ONE_FAIL,
    UPDATE_CATEGORY_ONE_REQUEST,
    UPDATE_CATEGORY_ONE_SUCCESS,
    UPDATE_CATEGORY_ONE_RESET,
    UPDATE_CATEGORY_ONE_FAIL,
    ALL_CATEGORY_TWOS_REQUEST,
    ALL_CATEGORY_TWOS_SUCCESS,
    ALL_CATEGORY_TWOS_FAIL,
    CATEGORY_TWO_DETAILS_REQUEST,
    CATEGORY_TWO_DETAILS_SUCCESS,
    CATEGORY_TWO_DETAILS_FAIL,    
    NEW_CATEGORY_TWO_REQUEST,
    NEW_CATEGORY_TWO_SUCCESS,
    NEW_CATEGORY_TWO_RESET,
    NEW_CATEGORY_TWO_FAIL,
    DELETE_CATEGORY_TWO_REQUEST,
    DELETE_CATEGORY_TWO_SUCCESS,
    DELETE_CATEGORY_TWO_RESET,
    DELETE_CATEGORY_TWO_FAIL,
    UPDATE_CATEGORY_TWO_REQUEST,
    UPDATE_CATEGORY_TWO_SUCCESS,
    UPDATE_CATEGORY_TWO_RESET,
    UPDATE_CATEGORY_TWO_FAIL,
    ALL_CATEGORY_THREES_REQUEST,
    ALL_CATEGORY_THREES_SUCCESS,
    ALL_CATEGORY_THREES_FAIL,
    CATEGORY_THREE_DETAILS_REQUEST,
    CATEGORY_THREE_DETAILS_SUCCESS,
    CATEGORY_THREE_DETAILS_FAIL,    
    NEW_CATEGORY_THREE_REQUEST,
    NEW_CATEGORY_THREE_SUCCESS,
    NEW_CATEGORY_THREE_RESET,
    NEW_CATEGORY_THREE_FAIL,
    DELETE_CATEGORY_THREE_REQUEST,
    DELETE_CATEGORY_THREE_SUCCESS,
    DELETE_CATEGORY_THREE_RESET,
    DELETE_CATEGORY_THREE_FAIL,
    UPDATE_CATEGORY_THREE_REQUEST,
    UPDATE_CATEGORY_THREE_SUCCESS,
    UPDATE_CATEGORY_THREE_RESET,
    UPDATE_CATEGORY_THREE_FAIL,   
    CLEAR_ERRORS
} from '../constants/categoryConstants'

export const categoryOnesReducer = ( state = { categoryOnes: [] }, action ) => {
    switch(action.type) {
        case ALL_CATEGORY_ONES_REQUEST:
            return {                
                loading: true,
                categoryOnes: []
            }        
        case ALL_CATEGORY_ONES_SUCCESS:
            return {
                loading: false,
                categoryOnes: action.payload.data               
            }                
        case ALL_CATEGORY_ONES_FAIL:
             return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryOneDetailsReducer = (state = { categoryOne: {} }, action) => {
    switch(action.type) {
        case CATEGORY_ONE_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORY_ONE_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryOne: action.payload               
            }                
        case CATEGORY_ONE_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryOneReducer = ( state = { categoryOne: {} }, action ) => {
    switch(action.type) {
        case NEW_CATEGORY_ONE_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORY_ONE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryOne: action.payload.data               
            }                
        case NEW_CATEGORY_ONE_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORY_ONE_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryOneReducer = ( state = {}, action ) => {
    switch(action.type) {
        case UPDATE_CATEGORY_ONE_REQUEST:
        case DELETE_CATEGORY_ONE_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORY_ONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORY_ONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORY_ONE_FAIL:
        case DELETE_CATEGORY_ONE_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORY_ONE_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORY_ONE_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}

export const categoryTwosReducer = ( state = { categoryTwos: [] }, action ) => {
    switch(action.type) {

        case ALL_CATEGORY_TWOS_REQUEST:
            return {
                loading: true,
                categoryTwos: []
            }
        
        case ALL_CATEGORY_TWOS_SUCCESS:
            return {
                loading: false,
                categoryTwos: action.payload.data               
            }
                
        case ALL_CATEGORY_TWOS_FAIL:
             return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }

        default:
            return state
    }
}
export const categoryTwoDetailsReducer = (state = { categoryTwo: {} }, action) => {
    switch(action.type) {
        case CATEGORY_TWO_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORY_TWO_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryTwo: action.payload               
            }                
        case CATEGORY_TWO_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryTwoReducer = ( state = { categoryTwo: {} }, action ) => {

    switch(action.type) {
        case NEW_CATEGORY_TWO_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORY_TWO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryTwo: action.payload.data               
            }                
        case NEW_CATEGORY_TWO_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORY_TWO_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryTwoReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_CATEGORY_TWO_REQUEST:
        case DELETE_CATEGORY_TWO_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORY_TWO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORY_TWO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORY_TWO_FAIL:
        case DELETE_CATEGORY_TWO_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORY_TWO_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORY_TWO_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}

export const categoryThreesReducer = ( state = { categoryThrees: [] }, action ) => {
    switch(action.type) {

        case ALL_CATEGORY_THREES_REQUEST:
            return {
                loading: true,
                categoryThrees: []
            }
        
        case ALL_CATEGORY_THREES_SUCCESS:
            return {
                loading: false,
                categoryThrees: action.payload.data               
            }
                
        case ALL_CATEGORY_THREES_FAIL:
             return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }

        default:
            return state
    }
}
export const categoryThreeDetailsReducer = (state = { categoryThree: {} }, action) => {
    switch(action.type) {
        case CATEGORY_THREE_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORY_THREE_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryThree: action.payload               
            }                
        case CATEGORY_THREE_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryThreeReducer = ( state = { categoryThree: {} }, action ) => {

    switch(action.type) {
        case NEW_CATEGORY_THREE_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORY_THREE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryThree: action.payload.data               
            }                
        case NEW_CATEGORY_THREE_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORY_THREE_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryThreeReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_CATEGORY_THREE_REQUEST:
        case DELETE_CATEGORY_THREE_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORY_THREE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORY_THREE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORY_THREE_FAIL:
        case DELETE_CATEGORY_THREE_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORY_THREE_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORY_THREE_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}