import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';

import { BASE_URL, CONVESION_URL } from '../../config.js';

import { compareFunction } from '../../helpers.js';

const initialState = {
  status: 'idle', // loading
  error: '',
  entities: {}
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: function(builder) {
    builder
      .addCase(fetchTickets.pending, function(state) {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchTickets.fulfilled, function(state, action) {
        state.status = 'idle';

        action.payload.forEach((ticket, i) => {
          state.entities[i] = ticket;
        });
      })
      .addCase(fetchTickets.rejected, function(state) {
        state.status = 'idle';
        state.error = 'Error fetching tickets data. Try again';
      })
      .addCase(convertPrices.fulfilled, function(state, action) {

        Object.keys(state.entities).forEach((key) => {
          state.entities[key].price *= action.payload;
          state.entities[key].price = Math.round(state.entities[key].price);
        });
      });
  }
});

// Thunk creators
const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function() {
  const response = await fetch(`${BASE_URL}/tickets`);
  const data = await response.json();

  return data;
});

const convertPrices = createAsyncThunk(
  'tickets/convertPrices',
  async function(_, { getState }) {
    const { oldCurrency } = getState().settings;

    const currency =
      Object.entries(getState().settings.currency).find((entry) => entry.at(1)).at(0);

    const response =
      await fetch(`${CONVESION_URL}/latest?from=${oldCurrency}&to=${currency}`);

    const data = await response.json();

    return data.rates[currency];
  }
);

// Selectors

// 1) Convert object of tickets to array
const selectAllTickets = createSelector(
  (state) => state.tickets.entities,
  (entities) => {
    return Object.entries(entities).map((entry) => {
      return {
        ...entry.at(1),
        id: entry.at(0)
      };
    });
  }
);

// 2) Filter tickets by stops
const selectFilteredTickets = createSelector(
  selectAllTickets,
  (state) => state.settings.stops,
  (allTickets, stops) => {
    const fullArray = Object.entries(stops).reduce((arr, entry) => {
      if (entry.at(0) === 'all' && entry.at(1)) {
        return allTickets;
      }

      const filteredArr = entry.at(1)
        ? allTickets.filter((ticket) => ticket.stops === +entry.at(0))
        : [];

      return arr.concat(filteredArr);
    }, []);

    return Array.from(new Set(fullArray));
  }
);

// 3) Sort tickets
const selectSortedTickets = createSelector(
  selectFilteredTickets,
  (state) => state.settings.sorting,
  (filteredTickets, sorting) => {
    return filteredTickets.slice().sort(function(a, b) {
      const { by: sortingBy, order } = sorting;

      if (sortingBy.stops) {
        return compareFunction(order, a.stops, b.stops);
      }

      if (sortingBy.price) {
        return compareFunction(order, a.price, b.price);
      }

      return 0;
    });
  }
);

export { fetchTickets, convertPrices, selectSortedTickets };

export default ticketsSlice.reducer;
