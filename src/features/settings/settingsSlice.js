import {
  createSlice,
  createSelector
} from '@reduxjs/toolkit';

const initialState = {
  sorting: {
    by: {
      stops: true,
      price: false
    },
    order: 'asc'  // 'desc'
  },
  currency: {
    GBP: true,
    USD: false,
    EUR: false
  },
  oldCurrency: '',
  stops: {
    all: true,
    0: false,
    1: false,
    2: false,
    3: false
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSortingBy(state, action) {
      Object.keys(state.sorting.by).forEach((sortingBy) => {
        state.sorting.by[sortingBy] = false;
      });

      state.sorting.by[action.payload] = true;
    },
    toggleSortingOrder(state) {
      state.sorting.order = state.sorting.order === 'asc' ? 'desc' : 'asc';
    },
    toggleCurrency(state, action) {
      state.oldCurrency = Object.entries(state.currency).find((entry) => {
        return entry.at(1);
      }).at(0);

      Object.keys(state.currency).forEach((cur) => {
        state.currency[cur] = false;
      });

      state.currency[action.payload] = true;
    },
    toggleStops(state, action) {
      state.stops[action.payload] = !state.stops[action.payload];
    },
    toggleStopsOnly(state, action) {
      Object.keys(state.stops).forEach((key) => {
        state.stops[key] = false;
      });

      state.stops[action.payload] = true;
    }
  }
});

// Selectors
const selectStops = createSelector(
  (state) => state.settings.stops,
  (stops) => {
    return Object.entries(stops).map((entry) => {
      return {
        stopsCount: entry.at(0),
        checked: entry.at(1)
      };
    });
  }
);

const selectSorting = createSelector(
  (state) => state.settings.sorting,
  (sorting) => {
    const { by, order } = sorting;

    const sortingArray = Object.entries(by).map((entry) => {
      return {
        sortingBy: entry.at(0),
        selected: entry.at(1)
      };
    });

    return {
      sortingArray,
      order
    };
  }
);

const selectCurrency = createSelector(
  (state) => state.settings.currency,
  (currency) => {
    return Object.entries(currency).map((entry) => {
      return {
        currency: entry.at(0),
        selected: entry.at(1)
      };
    });
  }
);

export const {
  toggleSortingBy,
  toggleSortingOrder,
  toggleCurrency,
  toggleStops,
  toggleStopsOnly
} = settingsSlice.actions;

export { selectStops, selectSorting, selectCurrency };

export default settingsSlice.reducer;
