import axios from 'axios';

import {
    GET_TECHS,
    ADD_TECH,
    DELETE_TECH,
    SET_LOADING,
    TECHS_ERROR
} from './types';

// Get techs from server
export const getTechs = (tech) => async dispatch => {
    try {
        setLoading();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/techs', tech, config);

        dispatch({
            type: GET_TECHS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        })
    }
};

// Add technician to server
export const addTech = tech => async dispatch => {
    try {
      setLoading();
  
      const res = await fetch('/api/techs', {
        method: 'POST',
        body: JSON.stringify(tech),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
  
      dispatch({
        type: ADD_TECH,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.statusText
      });
    }
  };

// Delete tech to server with axios
export const deleteTech = (_id) => async dispatch => {
    try {
        setLoading();

        await axios.delete(`/api/techs/${_id}`);

        dispatch({
            type: DELETE_TECH,
            payload: _id
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        })
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};