const talent_id = Symbol('talent_id');
const talent_name = Symbol('talent_name');
const price = Symbol('price');
const floating_second = Symbol('floating_second');
const subscription_price = Symbol('subscription_price');

class Talent {
  constructor(
    _talent_id,
    _talent_name,
    _floating_second,
    _subscription_price,
    _price,
  ) {
    this[talent_id] = _talent_id;
    this[talent_name] = _talent_name;
    this[subscription_price] = _subscription_price;
    this[floating_second] = _floating_second;
    this[price] = _price;
  }
  get_talent_id() { return this[talent_id]; }
  get_talent_name() { return this[talent_name]; }
  get_subscription_price() { return this[subscription_price]; }
  get_floating_second() { return this[floating_second]; }
  get_price() { return this[price]; }
}
module.exports = Talent;
