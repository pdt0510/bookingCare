//src12, //52ms39ss
import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: '',
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: 'vi', //42ms30ss
  systemMenuPath: '/system/user-manage',
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };
    // 25ms24ss
    case actionTypes.CHANGE_LANGUAE:
      return {
        ...state,
        language: action.lang,
      };
    default:
      return state;
  }
};

export default appReducer;
