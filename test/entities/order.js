const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/order';

const target = require(target_path);
describe('order entity', () => {
  const t_data  = {
    ordering_id: 1,
    ordering_type: 'sell',
    talent_id: 3,
    price: 2000,
    second: 1000,
    uncompleted_second: 500,
  };
  const instance = new target(
    t_data.ordering_id,
    t_data.ordering_type,
    t_data.talent_id,
    t_data.price,
    t_data.second,
    t_data.uncompleted_second,
  );

  it("#get_ordering_id", () => {
    const _v = instance.get_ordering_id();
    expect(_v).to.equal(t_data.ordering_id);
  });

  it("#get_ordering_type", () => {
    const _v = instance.get_ordering_type();
    expect(_v).to.equal(t_data.ordering_type);
  });

  it("#get_price", () => {
    const _v = instance.get_price();
    expect(_v).to.equal(t_data.price);
  });

  it("#get_second", () => {
    const _v = instance.get_second();
    expect(_v).to.equal(t_data.second);
  });

  it("#get_uncompleted_second", () => {
    const _v = instance.get_uncompleted_second();
    expect(_v).to.equal(t_data.uncompleted_second);
  });
})
