import Immutable from 'immutable';
import status from '../constants/status';
import firebase from '../firebase';

export const SAVE_MESSAGES_SUCCESS = 'SAVE_MESSAGES_SUCCESS';
export const SAVE_MESSAGES_FAILURE = 'SAVE_MESSAGES_FAILURE';
export const SAVE_MESSAGES_PENDING = 'SAVE_MESSAGES_PENDING';

const initialState = {
  list: [],
  status: null,
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case SAVE_MESSAGES_SUCCESS: {
      return Immutable.fromJS(state)
        .merge({
          list: action.payload,
          status: status.SUCCESS,
        })
        .toJS();
    }
    case SAVE_MESSAGES_FAILURE: {
      return Immutable.fromJS(state)
        .merge({
          list: [],
          status: status.FAILURE,
        })
        .toJS();
    }
    case SAVE_MESSAGES_PENDING: {
      return Immutable.fromJS(state)
        .merge({
          list: [],
          status: status.PENDING,
        })
        .toJS();
    }

    default:
      return state;
  }
}

export const actions = {
  getMessages() {
    return dispatch => {
      dispatch({type: SAVE_MESSAGES_PENDING});
      firebase
        .database()
        .ref('messages')
        .orderByKey()
        .limitToLast(30)
        .on(
          'value',
          snapshot => {
            const data = snapshot.val() || [];

            const list = [];
            Object.values(data).forEach(msg => {
              list.unshift(msg);
            });
            dispatch({type: SAVE_MESSAGES_SUCCESS, payload: list});
          },
          err => {
            console.error('getMessages: ', err);
            dispatch({type: SAVE_MESSAGES_FAILURE, payload: err});
          },
        );
    };
  },
};
