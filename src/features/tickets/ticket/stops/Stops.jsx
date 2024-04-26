import { generateInputLabels } from '../../../../helpers.js';

import styles from './Stops.module.scss';

const Stops = function({ stops }) {
  return (
    <div className={styles.stops}>
      <p className={styles.text}>{generateInputLabels(`${stops}`)}</p>

      <img
        className={styles.image}
        src="plane.jpg"
        alt="Plane"
      />
    </div>
  );
}

export default Stops;
