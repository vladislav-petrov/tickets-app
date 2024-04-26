import { useSelector } from 'react-redux';

import Sorting from './sorting/Sorting.jsx';
import Currency from './currency/Currency.jsx';
import Filter from './filter/Filter.jsx';

import styles from './Settings.module.scss';

const Settings = function() {
  const status = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);

  return (
    <section
      className={`${styles.settings} ${status === 'loading' || error ? styles.disabled: ''}`}
    >
      <Sorting />
      <Currency />
      <Filter />
    </section>
  );
}

export default Settings;
