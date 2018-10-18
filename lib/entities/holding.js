const talent_id = Symbol('talent_id');
const talent_name = Symbol('talent_name');
const second = Symbol('second');
const price = Symbol('price');
const average_cost = Symbol('average_cost');
const profits_and_loses = Symbol('profits_and_loses');

class Holding {
  constructor(
    _talent_id,
    _talent_name,
    _second,
    _price,
    _average_cost,
    _profits_and_loses,
  ) {
    this[talent_id] = _talent_id;
    this[talent_name] = _talent_name;
    this[price] = _price;
    this[second] = _second;
    this[average_cost] = _average_cost;
    this[profits_and_loses] = _profits_and_loses;
  }
  get_talent_id() { return this[talent_id]; }
  get_talent_name() { return this[talent_name]; }
  get_price() { return this[price]; }
  get_second() { return this[second]; }
  get_average_cost() { return this[average_cost]; }
  get_profits_and_loses() { return this[profits_and_loses]; }
}
module.exports = Holding;
