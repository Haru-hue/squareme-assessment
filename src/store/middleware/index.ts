import { isAction, Middleware, UnknownAction } from "@reduxjs/toolkit";
import { fetchTransactionsData } from "../features/transactionData";
import { fetchChartData } from "../features/chart";

export const initializeMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (isAction(action) && action.type === "APP_INIT") {
      store.dispatch(fetchTransactionsData() as unknown as UnknownAction); // Cast the async thunk action
      store.dispatch(fetchChartData() as unknown as UnknownAction); // Cast the async thunk action
    }
    return next(action);
  };
