import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_SUBMIT_LOADING,
  SET_CURRENT_VIEW,
} from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
  loginPassword: '',
  submitLoading: false,
  currentView: "login",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      console.debug("SET USERNAME. Value: "+action.payload);
      state = {
        ...state,
        loginUsername: action.payload
      };
      return state;
    }
    case SET_PASSWORD: {
      console.debug("SET PASSWORD. Value: "+action.payload);
      state = {
        ...state,
        loginPassword: action.payload
      };
      return state;
    }
    case SET_SUBMIT_LOADING: {
      console.debug("SET SUBMIT LOADING. Value: "+action.payload);
      state = {
        ...state,
        submitLoading: action.payload
      };
      return state;
    }
    case SET_CURRENT_VIEW: {
      console.debug("SET CURRENT VIEW. Value: "+action.payload);
      state = {
        ...state,
        currentView: action.payload
      };
      return state;
    }
    default:
      return state;
  }
};
