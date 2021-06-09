import axios from 'axios';

import { 
    ADD_LOG, 
    GET_LOGS, 
    UPDATE_LOG,
    DELETE_LOG,
    SET_LOADING, 
    LOGS_ERROR, 
    SET_CURRENT, 
    CLEAR_CURRENT, 
    SEARCH_LOGS, 
} from './types';

// Add new log to server
export const addLog = (log) => async dispatch => {
    try {
        setLoading();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/logs', log, config);

        dispatch({
            type: ADD_LOG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// Get logs from server
export const getLogs = (log) => async dispatch => {
    try {
        setLoading();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/logs', log, config);

        dispatch({
            type: GET_LOGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
};

// Update log on server
export const updateLog = (log) => async dispatch => {
    setLoading();

    const config = {
        body: JSON.stringify(log),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/logs/${log._id}`, log, config);

        dispatch({
            type: UPDATE_LOG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// Search server logs
export const searchLogs = (text) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/api/logs?q=${text}`);
        const data = await res.json();

        dispatch({
            type: SEARCH_LOGS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
};

// Delete log to server with axios
export const deleteLog = (_id) => async dispatch => {
    try {
        setLoading();

        await axios.delete(`/api/logs/${_id}`);

        dispatch({
            type: DELETE_LOG,
            payload: _id
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// Set current log
export const setCurrent = log => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

// Clear current log
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT,
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};