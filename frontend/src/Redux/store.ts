import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.ts';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { Persistor } from 'redux-persist';

// 1. Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
});

// 2. Config for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Persistor
export const persistor: Persistor = persistStore(store);

// 6. Infer the types of RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
