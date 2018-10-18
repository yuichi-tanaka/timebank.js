const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/status';

const target = require(target_path);
describe('status entity', () => {
  const t_data  = {
    opening_price: 10,
    closing_price: 20,
    high: 3000,
    low: 2000,
    volume: 1000,
    turnover: 500,
    date: '2018-10-15',
  };
  const instance = new target(
    t_data.opening_price,
    t_data.closing_price,
    t_data.high,
    t_data.low,
    t_data.volume,
    t_data.turnover,
    t_data.date,
  );

  it("#get_opening_price", () => {
    const _v = instance.get_opening_price();
    expect(_v).to.equal(t_data.opening_price);
  });

  it("#get_closing_price", () => {
    const _v = instance.get_closing_price();
    expect(_v).to.equal(t_data.closing_price);
  });

  it("#get_high", () => {
    const _v = instance.get_high();
    expect(_v).to.equal(t_data.high);
  });

  it("#get_low", () => {
    const _v = instance.get_low();
    expect(_v).to.equal(t_data.low);
  });

  it("#get_volume", () => {
    const _v = instance.get_volume();
    expect(_v).to.equal(t_data.volume);
  });

  it("#get_turnover", () => {
    const _v = instance.get_turnover();
    expect(_v).to.equal(t_data.turnover);
  });

  it("#get_date", () => {
    const _v = instance.get_date();
    expect(_v).to.equal(t_data.date);
  });
})
