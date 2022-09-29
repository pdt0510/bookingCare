//src15, 13ms45ss,
import actionTypes from './actionTypes';
import { userService } from '../../services';

// 31ms04ss
export const fetchAttrsOfAllcodeApi = () => {
  const genderList = [];
  const roleList = [];
  const posList = [];

  return async (dispatch) => {
    try {
      //6ms54ss, v67xx1
      // dispatch({ type: actionTypes.FETCHING_API });

      const data = await userService.allCodeUser();
      if (data.errCode === 0) {
        data.allCodes.forEach((item) => {
          if (item.type === 'GENDER') {
            genderList.push(item);
          } else if (item.type === 'ROLE') {
            roleList.push(item);
          } else if (item.type === 'POSITION') {
            posList.push(item);
          }
        });
      }

      //way 2.2
      const payloadData = { genderList, roleList, posList };
      return dispatch(fetchGenderApiSuccessed(payloadData));

      //way 2.1
      // return dispatch({
      //   type: actionTypes.FETCH_GENDER_API_SUCCESSED,
      //   payload: { genderList, roleList, posList },
      // });
    } catch (error) {
      fetchGenderApiFailed();
      console.log('fetchAttrsOfAllcodeApi error', error);
    }
  };
};

export const fetchGenderApiSuccessed = (payload) => ({
  type: actionTypes.FETCH_GENDER_API_SUCCESSED,
  payload,
});

export const fetchGenderApiFailed = () => ({
  type: actionTypes.FETCH_GENDER_API_FAILED,
});

export const isLoadingFromFetch = () => ({
  type: actionTypes.FETCHING_API, // v67xx1
});
