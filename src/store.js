import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './features/settings/settingsSlice.js';
import ticketsReducer from './features/tickets/ticketsSlice.js';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    tickets: ticketsReducer
  }
});

export default store;
