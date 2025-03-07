import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactionData';
import chartReducer from './features/chart';
import { initializeMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    transactions: transactionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(initializeMiddleware),
});

store.dispatch({ type: 'APP_INIT' });

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;