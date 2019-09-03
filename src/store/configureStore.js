import {createStore, applyMiddleware} from 'redux';
import reducers from '../models';
import ReduxThunk from 'redux-thunk';

export default function configureStore() {
  return createStore(reducers, {}, applyMiddleware(ReduxThunk));
}
