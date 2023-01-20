import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth';
import transactionReducer from './transaction';
import profileReducer from './profile';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  transaction: transactionReducer,
  profile: profileReducer
});

export default rootReducer;
