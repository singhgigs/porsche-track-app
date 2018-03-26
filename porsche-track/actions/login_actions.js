import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_SUBMIT_LOADING,
  SET_CURRENT_VIEW,
} from './types';

export const setUsername = payload => ({ type: SET_USERNAME, payload});
export const setPassword = payload => ({ type: SET_PASSWORD, payload});
export const setSubmitLoading = payload => ({type: SET_SUBMIT_LOADING, payload});
export const setCurrentView = payload => ({type: SET_CURRENT_VIEW, payload});
