import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./user";
import productReducer from "./product";
import cartReducer from "./cart/cart.reducer";
import historyReducer from "./history";
import favoriteReducer from "./favorite";

let composeEnhancers = compose;
const middleware = [thunk];

if (__DEV__) {
  composeEnhancers =
    (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
    compose;
}

const rootReducer = combineReducers({
  auth: userReducer,
  products: productReducer,
  productFavorites: favoriteReducer,
  cart: cartReducer,
  transactionHistories: historyReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
