const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const target_path = process.env.PWD + '/lib/usecases/exchange';
const interface_path = process.env.PWD + '/lib/usecases/exchange_repository';
const exchange_entity_path = process.env.PWD + '/lib/entities/exchange';

const target = require(target_path);
const exchange_entity = require(exchange_entity_path);

const s_interface = require(interface_path);
const s_stub = class extends s_interface {
  constructor(){
    super();
  }
  async fetch(jwt, talent_id) {}
};
const jwt = 'aaaaa-bbbbb';
const _exchanges = [
  {
    type: 'buy',
    second: 200,
    price: 30
  },
  {
    type: 'sell',
    second: 100,
    price: 30.1
  }
];

describe('exchange usecase', () => {

  it('should throw exeptions when the argument is null', () => {
    expect(() => new target()).to.throw('repository must inherits IExchangeRepository');
  })

  const stub_instance = new s_stub();
  it('#exchange',async () => {
    let obj = {
      price: 30.2,
      buy_order: [],
      sell_order: [],
    };
    for(let e of _exchanges) {
      const _e = new exchange_entity(e.type, e.price, e.second);
      const list = (e.type === 'buy') ? obj.buy_order : obj.sell_order;
      list.push(_e);
    }
    const s = sinon.stub(stub_instance, 'fetch');
    s.returns(obj);
    const i = new target(stub_instance);
    const result = await i.exchange(jwt, 1);
    expect(result.price).to.equal(30.2);
    expect(result.buy_order.length).to.equal(1);
    expect(result.sell_order.length).to.equal(1);
    expect(result.buy_order[0].get_type()).to.equal(_exchanges[0].type);
    expect(result.buy_order[0].get_price()).to.equal(_exchanges[0].price);
    expect(result.buy_order[0].get_second()).to.equal(_exchanges[0].second);
    expect(result.sell_order[0].get_type()).to.equal(_exchanges[1].type);
    expect(result.sell_order[0].get_price()).to.equal(_exchanges[1].price);
    expect(result.sell_order[0].get_second()).to.equal(_exchanges[1].second);
  });

})
