import { 
    ADD_LOG,
    GET_LOGS,
    UPDATE_LOG,
    DELETE_LOG, 
    SET_LOADING, 
    LOGS_ERROR, 
    SEARCH_LOGS, 
    SET_CURRENT, 
    CLEAR_CURRENT 
} from '../actions/types';

const initialState = {
    logs: null,
    current: null,
    loading: false,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default(state = initialState, action) => {
    switch(action.type) {
        case ADD_LOG:
            return {
                ...state,
                logs: [...state.logs, action.payload],
                loading: false
            }
        case GET_LOGS:
            return {
                ...state,
                logs: action.payload,
                loading: false
            }
        case UPDATE_LOG:
            return {
                ...state,
                logs: state.logs.map(log => log._id === action.payload._id ? action.payload : log),
                loading: false,
            }
        case SEARCH_LOGS:
            return {
                ...state,
                logs: action.payload
            }
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.payload),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOGS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}