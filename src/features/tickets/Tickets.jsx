import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectCurrency } from '../settings/settingsSlice.js';
import { selectSortedTickets, fetchTickets, convertPrices } from './ticketsSlice.js';

import Ticket from './ticket/Ticket.jsx';

import styles from './Tickets.module.scss';

const Tickets = function() {
  const currency = useSelector(selectCurrency).find((cur) => cur.selected).currency;
  const oldCurrency = useSelector((state) => state.settings.oldCurrency);
  const tickets = useSelector(selectSortedTickets);
  const status = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(function() {
    if (!oldCurrency) return;
    if (oldCurrency === currency) return;

      dispatch(convertPrices());
    }, [oldCurrency, currency, dispatch]);

  return (
    <section className={styles.tickets}>
      {status === 'loading' && <span className={styles.loading}>Loading...</span>}
      {error && <span className={styles.error}>{error}</span>}
      {status === 'idle' && !error && !tickets.length && <p>По заданным критериям не найдено ни одного билета</p>}
      {tickets.map((ticket) => {
        return (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            currency={currency}
          />
        );
      })}
    </section>
  );
}

export default Tickets;
