const ordering_id = Symbol('ordering_id');
const ordering_type  = Symbol('ordering_type');
const talent_id = Symbol('talent_id');
const second = Symbol('second');
const price = Symbol('price');
const uncompleted_second = Symbol('uncompleted_second');

class Order {
  constructor(
    _ordering_id,
    _ordering_type,
    _talent_id,
    _price,
    _second,
    _uncompleted_second,
  ) {
    this[ordering_id] = _ordering_id;
    this[ordering_type] = _ordering_type;
    this[talent_id] = _talent_id;
    this[price] = _price;
    this[second] = _second;
    this[uncompleted_second] = _uncompleted_second;
  }
  get_ordering_id() { return this[ordering_id]; }
  get_ordering_type() { return this[ordering_type]; }
  get_talent_id() { return this[talent_id]; }
  get_price() { return this[price]; }
  get_second() { return this[second]; }
  get_uncompleted_second() { return this[uncompleted_second]; }
}
module.exports = Order;
