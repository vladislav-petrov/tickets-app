const compareFunction = function(order, a, b) {
  return order === 'asc' ? a - b: b - a;
}

const generateInputLabels = function(stopsCount) {
  switch (stopsCount) {
    case 'all': {
      return 'Все';
    }
    case '0': {
      return 'Без пересадок';
    }
    case '1': {
      return `${stopsCount} пересадка`;
    }
    default: {
      return `${stopsCount} пересадки`;
    }
  }
}

const getSortingLabels = function(sortingBy) {
  switch (sortingBy) {
    case 'stops': {
      return 'По количеству пересадок';
    }
    case 'price': {
      return 'По цене';
    }
    default: {
      return '';
    }
  }
}

const getPriceWithCurrency = function(price, currency) {
  switch (currency) {
    case 'GBP': {
      return `£${price}`;
    }
    case 'USD': {
      return `$${price}`;
    }
    case 'EUR': {
      return `€${price}`;
    }
    default: {
      return price;
    }
  }
}

const formatTime = function(timeString) {
  return timeString.padStart(5,0);
}

const formatDate = function(dateString) {
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

  const strParts = dateString.split('.');
  const newDateString = `${strParts[1]}.${strParts[0]}.${strParts[2]}`;

  const date = new Date(newDateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const weekday = weekdays[date.getDay() - 1];

  return `${day} ${month} ${year}, ${weekday}`;
}

export {
  compareFunction,
  generateInputLabels,
  getSortingLabels,
  getPriceWithCurrency,
  formatTime,
  formatDate
};
