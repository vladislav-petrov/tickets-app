import { useSelector, useDispatch } from 'react-redux';

import { selectCurrency, toggleCurrency } from '../settingsSlice.js';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import { StyledEngineProvider } from '@mui/material/styles';

import styles from './Currency.module.scss';

const Currency = function() {
  const currency = useSelector(selectCurrency);
  const dispatch = useDispatch();

  const handleClick = function(event) {
    dispatch(toggleCurrency(event.target.textContent));
  }

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.currency}>
        <h3 className={styles.heading}>Валюта</h3>

        <ButtonGroup
          className={styles.buttonGroup}
          variant="contained"
        >
          {currency.map(({ currency, selected }) => {
            return (
              <Button
                key={currency}
                className={`${styles.button} ${selected ? styles.active: ''}`}
                onClick={handleClick}
              >
                {currency}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    </StyledEngineProvider>
  );
}

export default Currency;
