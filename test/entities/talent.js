const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/talent';

const target = require(target_path);
describe('talent entity', () => {
  const t_data  = {
    talent_id: 1,
    talent_name: 'テストタレント',
    floating_second: 3000,
    subscription_price: 2000,
    price: 1000,
  };
  const instance = new target(
    t_data.talent_id,
    t_data.talent_name,
    t_data.floating_second,
    t_data.subscription_price,
    t_data.price,
  );

  it("#get_talent_id", () => {
    const _v = instance.get_talent_id();
    expect(_v).to.equal(t_data.talent_id);
  });

  it("#get_talent_name", () => {
    const _v = instance.get_talent_name();
    expect(_v).to.equal(t_data.talent_name);
  });

  it("#get_floating_second", () => {
    const _v = instance.get_floating_second();
    expect(_v).to.equal(t_data.floating_second);
  });

  it("#get_subscription_price", () => {
    const _v = instance.get_subscription_price();
    expect(_v).to.equal(t_data.subscription_price);
  });

  it("#get_price", () => {
    const _v = instance.get_price();
    expect(_v).to.equal(t_data.price);
  });
})
