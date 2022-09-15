//src12
import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

//25ms24ss
export const changeLangsApp = (lang) => ({
  type: actionTypes.CHANGE_LANGUAE,
  lang,
});
