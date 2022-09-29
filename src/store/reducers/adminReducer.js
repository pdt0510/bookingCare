//src15, 18ms57ss
import actionTypes from '../actions/actionTypes';

const initialState = {
  genderList: [],
  roleList: [],
  posList: [],
  isLoading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_API:
      return {
        ...state,
        isLoading: true, //4ms20ss
      };

    case actionTypes.FETCH_GENDER_API_SUCCESSED: //43ms59ss
      const { genderList, roleList, posList } = action.payload;
      return {
        ...state,
        genderList,
        roleList,
        posList,
        isLoading: false, //4ms20ss, remove mes after calling api
      };

    case actionTypes.FETCH_GENDER_API_FAILED:
      return {
        ...state,
        isLoading: false, //4ms20ss
      };

    default:
      return state;
  }
};

export default adminReducer;
