import { getPriceWithCurrency } from '../../../helpers.js';

import TicketInfo from './info/TicketInfo.jsx';
import Stops from './stops/Stops.jsx';

import styles from './Ticket.module.scss';

const Ticket = function({ ticket, currency }) {
  const price = getPriceWithCurrency(ticket.price, currency);

  return (
    <div className={styles.ticket}>
      <div className={styles.sectionBuy}>
        <img
          className={styles.logo}
          src={`${ticket.carrier.toLowerCase()}.png`}
          alt={`${ticket.carrier} logo`}
        />

        <button className={styles.button}>
          Купить<br/>за {price}
        </button>
      </div>

      <div className={styles.sectionInfo}>
        <TicketInfo
          time={ticket.departure_time}
          city={`${ticket.origin}, ${ticket.origin_name}`}
          date={ticket.departure_date}
          align="start"
        />

        <Stops stops={ticket.stops} />

        <TicketInfo
          time={ticket.arrival_time}
          city={`${ticket.destination_name}, ${ticket.destination}`}
          date={ticket.arrival_date}
          align="end"
        />
      </div>
    </div>
  );
}

export default Ticket;
