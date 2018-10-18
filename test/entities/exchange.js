const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/exchange';
const target = require(target_path);

describe('exchange entity', () => {
  const t_data  = {
    price: 100,
    second: 60,
    type: 'buy',
  };
  const instance = new target(
    t_data.type,
    t_data.price,
    t_data.second,
  );

  it("#get_type", () => {
    const _v = instance.get_type();
    expect(_v).to.equal(t_data.type);
  });

  it("#get_price", () => {
    const _v = instance.get_price();
    expect(_v).to.equal(t_data.price);
  });

  it("#get_second", () => {
    const _v = instance.get_second();
    expect(_v).to.equal(t_data.second);
  });
})
