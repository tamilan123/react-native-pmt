// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, // Uses AsyncStorage for persistence
//   whitelist: ['user', 'settings'] // Only persist these reducers
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;