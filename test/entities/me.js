const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/me';

const target = require(target_path);
describe('me entity', () => {
  const t_data  = {
    gross_assets: 100,
    profits_and_loses: -200,
    buying_power: 300
  };
  const instance = new target(t_data.gross_assets, t_data.profits_and_loses, t_data.buying_power);

  it("#get_gross_assets", () => {
    const _v = instance.get_gross_assets();
    expect(_v).to.equal(t_data.gross_assets);
  });

  it("#get_profits_and_loses", () => {
    const _v = instance.get_profits_and_loses();
    expect(_v).to.equal(t_data.profits_and_loses);
  });

  it("#get_buying_power", () => {
    const _v = instance.get_buying_power();
    expect(_v).to.equal(t_data.buying_power);
  });
})
