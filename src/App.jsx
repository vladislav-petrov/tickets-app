// import { useEffect } from 'react';

// import { useSelector, useDispatch } from 'react-redux';

// import {
//   selectSortedTickets,
//   fetchTickets,
//   convertPrices
// } from './features/tickets/ticketsSlice.js';

import Header from './features/header/Header.jsx';
import Settings from './features/settings/Settings.jsx';
import Tickets from './features/tickets/Tickets.jsx';

import styles from './App.module.scss';

const App = function() {
  // const tickets = useSelector(selectSortedTickets);
  // const dispatch = useDispatch();
  // console.log(tickets);

  // useEffect(function() {
  //   dispatch(fetchTickets());
  // }, [dispatch]);

  // const handleClick = function() {
  //   dispatch(convertPrices());
  // }

  return (
    <main className={styles.app}>
      <Header />
      <Settings />
      <Tickets />
    </main>
  );
}

export default App;
