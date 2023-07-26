import { combineReducers } from 'redux';
import CartSlice from './slices/CartSlice';


const rootReducer = combineReducers({
  cart: CartSlice,
});

export default rootReducer;