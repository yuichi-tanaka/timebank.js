const gross_assets = Symbol('gross_assets');
const profits_and_loses = Symbol('profits_and_loses');
const buying_power = Symbol('buying_power');

class Me {
  constructor( _gross_assets, _profits_and_loses, _buying_power) {
    this[gross_assets] = _gross_assets;
    this[profits_and_loses] = _profits_and_loses;
    this[buying_power] = _buying_power;
  }
  get_gross_assets() { return this[gross_assets]; }
  get_profits_and_loses() { return this[profits_and_loses]; }
  get_buying_power() { return this[buying_power]; }
}
module.exports = Me;
