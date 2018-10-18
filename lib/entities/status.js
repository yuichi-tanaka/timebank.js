const opening_price = Symbol('opening_price');
const closing_price = Symbol('closing_price');
const high = Symbol('high');
const low = Symbol('low');
const volume = Symbol('volume');
const turnover= Symbol('turnover');
const date = Symbol('date');

class Status {
  constructor(
    _opening_price,
    _closing_price,
    _high,
    _low,
    _volume,
    _turnover,
    _date
  ) {
    this[opening_price] = _opening_price;
    this[closing_price] = _closing_price;
    this[high] = _high;
    this[low] = _low;
    this[volume] = _volume;
    this[turnover] = _turnover;
    this[date] = _date;
  }
  get_opening_price() { return this[opening_price]; }
  get_closing_price() { return this[closing_price]; }
  get_high() { return this[high]; }
  get_low() { return this[low]; }
  get_volume() { return this[volume]; }
  get_turnover() { return this[turnover]; }
  get_date() { return this[date]; }
}
module.exports = Status;
