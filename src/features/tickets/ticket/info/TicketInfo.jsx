import { formatTime, formatDate } from '../../../../helpers.js';

import styles from './TicketInfo.module.scss';

const TicketInfo = function({ time, city, date, align }) {
  return (
    <div
      className={`${styles.ticketInfo} ${align === 'start' ? styles.alignStart : styles.alignEnd}`}
    >
      <h2 className={styles.time}>{formatTime(time)}</h2>
      <p className={styles.city}>{city}</p>
      <p className={styles.date}>{formatDate(date)}</p>
    </div>
  );
}

export default TicketInfo;
