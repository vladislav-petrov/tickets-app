import { useSelector, useDispatch } from 'react-redux';

import { generateInputLabels } from '../../../helpers.js';

import { toggleStops, toggleStopsOnly } from '../settingsSlice.js';

import { selectStops } from '../settingsSlice.js';

import styles from './Filter.module.scss';

const Filter = function() {
  const stops = useSelector(selectStops);
  const dispatch = useDispatch();

  const handleChange = function(event) {
    dispatch(toggleStops(event.target.name));
  }

  const handleClick = function(event) {
    dispatch(toggleStopsOnly(event.target.name));
  }

  return (
    <div className={styles.filter}>
      <h3 className={styles.heading}>Количество пересадок</h3>

      <ul className={styles.list}>
        {stops.map((stopEl) => {
          return (
            <li
              key={stopEl.stopsCount}
              className={styles.listItem}
            >
              <label className={styles.label}>
                <input
                  className={`${styles.checkbox} ${stopEl.checked ? styles.checked : ''}`}
                  type="checkbox"
                  name={stopEl.stopsCount}
                  onChange={handleChange}
                />

                {generateInputLabels(stopEl.stopsCount)}
              </label>

              <button
                className={styles.buttonOnly}
                name={stopEl.stopsCount}
                onClick={handleClick}
              >
                Только
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
