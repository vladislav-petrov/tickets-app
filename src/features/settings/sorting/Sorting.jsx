import { useSelector, useDispatch } from 'react-redux';

import { getSortingLabels } from '../../../helpers.js';

import {
  selectSorting,
  toggleSortingBy,
  toggleSortingOrder
} from '../settingsSlice.js';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

import { StyledEngineProvider } from '@mui/material/styles';

import styles from './Sorting.module.scss';

const Sorting = function() {
  const { sortingArray } = useSelector(selectSorting);
  const dispatch = useDispatch();

  const handleOrderChange = function() {
    dispatch(toggleSortingOrder());
  }

  const handleSortingByChange = function(event) {
    dispatch(toggleSortingBy(event.target.value));
  }

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.sorting}>
        <h3 className={styles.heading}>Сортировка</h3>

        <div className={styles.content}>
          <FormControl
            fullWidth
            size="small"
          >
            <Select
              className={styles.select}
              value={sortingArray.find((sortingEl) => sortingEl.selected).sortingBy}
              onChange={handleSortingByChange}
            >
              {sortingArray.map(({ sortingBy }) => {
                return (
                  <MenuItem
                    key={sortingBy}
                    value={sortingBy}
                  >
                    {getSortingLabels(sortingBy)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <button
            className={styles.button}
            onClick={handleOrderChange}
          >
            <SwapVertRoundedIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </StyledEngineProvider>
  );
}

export default Sorting;
