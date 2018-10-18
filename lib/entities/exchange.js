const price = Symbol('price');
const second = Symbol('second');
const type = Symbol('type');

class Exchange {
  constructor(
    _type,
    _price,
    _second
  ) {
    this[type] = _type;
    this[price] = _price;
    this[second] = _second;
  }
  get_type() { return this[type]; }
  get_price() { return this[price]; }
  get_second() { return this[second]; }
}
module.exports = Exchange;
