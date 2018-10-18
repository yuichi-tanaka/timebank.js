const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/holding';

const target = require(target_path);
describe('holding entity', () => {
  const t_data  = {
    talent_id: 1,
    talent_name: 'テストタレント',
    second: 3000,
    price: 2000,
    average_cost: 1000,
    profits_and_loses: -500,
  };
  const instance = new target(
    t_data.talent_id,
    t_data.talent_name,
    t_data.second,
    t_data.price,
    t_data.average_cost,
    t_data.profits_and_loses,
  );

  it("#get_talent_id", () => {
    const _v = instance.get_talent_id();
    expect(_v).to.equal(t_data.talent_id);
  });

  it("#get_talent_name", () => {
    const _v = instance.get_talent_name();
    expect(_v).to.equal(t_data.talent_name);
  });

  it("#get_second", () => {
    const _v = instance.get_second();
    expect(_v).to.equal(t_data.second);
  });

  it("#get_price", () => {
    const _v = instance.get_price();
    expect(_v).to.equal(t_data.price);
  });

  it("#get_average_cost", () => {
    const _v = instance.get_average_cost();
    expect(_v).to.equal(t_data.average_cost);
  });

  it("#get_profits_and_loses", () => {
    const _v = instance.get_profits_and_loses();
    expect(_v).to.equal(t_data.profits_and_loses);
  });
})
