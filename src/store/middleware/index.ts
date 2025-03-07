import { isAction, Middleware, UnknownAction } from '@reduxjs/toolkit';
import { fetchTransactionsData } from '../features/transactionData';
import { fetchWishlistData } from '../features/wishlistSlice';
import { fetchCategories } from '../features/category';

export const initializeMiddleware: Middleware = (store) => (next) => (action) => {
  if (isAction(action) && action.type === 'APP_INIT') {
    store.dispatch(fetchTransactionsData() as unknown as UnknownAction); // Cast the async thunk action
    store.dispatch(fetchWishlistData() as unknown as UnknownAction); // Cast the async thunk action
    store.dispatch(fetchCategories() as unknown as UnknownAction); // Cast the async thunk action
  }
  return next(action);
};
