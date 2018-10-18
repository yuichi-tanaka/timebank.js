const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const target_path = process.env.PWD + '/lib/usecases/me';
const interface_path = process.env.PWD + '/lib/usecases/me_repository';
const me_entity_path = process.env.PWD + '/lib/entities/me';
const holding_entity_path = process.env.PWD + '/lib/entities/holding';
const order_entity_path = process.env.PWD + '/lib/entities/order';

const target = require(target_path);
const me_entity = require(me_entity_path);
const holding_entity = require(holding_entity_path);
const order_entity = require(order_entity_path);

const s_interface = require(interface_path);
const s_stub = class extends s_interface {
  constructor(){
    super();
  }
  async find(jwt) {}
  async holdings(jwt) {}
  async fetch_orders(jwt) {}
  async create_order(jwt, orders) {}
  async cancel_order(jwt, ordering_id) {}
};
const jwt = 'aaaaa-bbbbb';
const _me ={
  gross_assets: 100,
  profits_and_loses: 200,
  buying_power: 300
}
const _holdings = [
  {
    talent_id: 1,
    talent_name: 'サンプルタレント',
    second: 300,
    current_price: 15.8,
    average_cost: 11.8,
    profits_and_loses: -280,
  },
  {
    talent_id: 5,
    talent_name: 'サンプルタレント5',
    second: 500,
    current_price: 105.0,
    average_cost: 102.3,
    profits_and_loses: -28000,
  }
];

const _orders = [
  {
    ordering_id: 1,
    ordering_type: 'buy',
    talent_id: 1,
    price: 3.2,
    second: 1200,
    uncompleted_second: 50,
  },
  {
    ordering_id: 2,
    ordering_type: 'sell',
    talent_id: 2,
    price: 233.2,
    second: 100,
    uncompleted_second: 10,
  }
];

describe('me usecase', () => {

  it('should throw exeptions when the argument is null', () => {
    expect(() => new target()).to.throw('repository must inherits IMeRepository');
  })

  const stub_instance = new s_stub();
  it('#current_status',async () => {
    const obj = new me_entity(
      _me.gross_assets,
      _me.profits_and_loses,
      _me.buying_power
    )
    const s = sinon.stub(stub_instance, 'find');
    s.returns(obj);
    const i = new target(stub_instance);
    const result = await i.current_status(jwt);
    expect(result.get_gross_assets()).to.equal(100);
    expect(result.get_profits_and_loses()).to.equal(200);
    expect(result.get_buying_power()).to.equal(300);
  });

  it('#holdings',async () => {
    let objs = [];
    for( let h of _holdings) {
      objs.push(new holding_entity(
        h.talent_id,
        h.talent_name,
        h.second,
        h.current_price,
        h.average_cost,
        h.profits_and_loses
      ));
    }
    const s = sinon.stub(stub_instance, 'holdings');
    s.returns(objs);
    const i = new target(stub_instance);

    const result = await i.holdings(jwt);
    expect(result.length).to.equal(_holdings.length);
    expect(result[0].get_talent_id()).to.equal(_holdings[0].talent_id);
    expect(result[0].get_talent_name()).to.equal(_holdings[0].talent_name);
    expect(result[0].get_second()).to.equal(_holdings[0].second);
    expect(result[0].get_price()).to.equal(_holdings[0].current_price);
    expect(result[0].get_average_cost()).to.equal(_holdings[0].average_cost);
    expect(result[0].get_profits_and_loses()).to.equal(_holdings[0].profits_and_loses);

    expect(result[1].get_talent_id()).to.equal(_holdings[1].talent_id);
    expect(result[1].get_talent_name()).to.equal(_holdings[1].talent_name);
    expect(result[1].get_second()).to.equal(_holdings[1].second);
    expect(result[1].get_price()).to.equal(_holdings[1].current_price);
    expect(result[1].get_average_cost()).to.equal(_holdings[1].average_cost);
    expect(result[1].get_profits_and_loses()).to.equal(_holdings[1].profits_and_loses);
  });

  it('#orderings',async () => {
    let objs = [];
    for( let o of _orders) {
      objs.push(new order_entity(
          o.ordering_id,
          o.ordering_type,
          o.talent_id,
          o.price,
          o.second,
          o.uncompleted_second,
      ));
    }
    const s = sinon.stub(stub_instance, 'fetch_orders');
    s.returns(objs);
    const i = new target(stub_instance);

    const result = await i.orderings(jwt);
    expect(result.length).to.equal(_orders.length);
    expect(result[0].get_ordering_id()).to.equal(_orders[0].ordering_id);
    expect(result[0].get_ordering_type()).to.equal(_orders[0].ordering_type);
    expect(result[0].get_talent_id()).to.equal(_orders[0].talent_id);
    expect(result[0].get_price()).to.equal(_orders[0].price);
    expect(result[0].get_second()).to.equal(_orders[0].second);
    expect(result[0].get_uncompleted_second()).to.equal(_orders[0].uncompleted_second);

    expect(result[1].get_ordering_id()).to.equal(_orders[1].ordering_id);
    expect(result[1].get_ordering_type()).to.equal(_orders[1].ordering_type);
    expect(result[1].get_talent_id()).to.equal(_orders[1].talent_id);
    expect(result[1].get_price()).to.equal(_orders[1].price);
    expect(result[1].get_second()).to.equal(_orders[1].second);
    expect(result[1].get_uncompleted_second()).to.equal(_orders[1].uncompleted_second);
  });

  it('#create_order',async () => {
    const ok_order = {
      talent_id: 1,
      ordering_type: 'sell',
      second: 100,
      price: 10.0
    };
    const ng_order = {
      talent_id: 2,
      ordering_type: 'ng!!!',
      second: 200,
      second: 15.8,
    };
    const s = sinon.stub(stub_instance, 'create_order');
    s.withArgs(jwt, ok_order).returns(true);
    s.withArgs(jwt, ng_order).returns(undefined);
    const i = new target(stub_instance);

    const ok_result = await i.create_order(jwt, ok_order);
    const ng_result = await i.create_order(jwt, ng_order);

    expect(ok_result).to.equal(true);
    expect(ng_result).to.equal(undefined);
  });

  it('#cancel_order',async () => {
    const s = sinon.stub(stub_instance, 'cancel_order');
    s.withArgs(jwt, 1).returns(true);
    s.withArgs(jwt, 2).returns(undefined);
    const i = new target(stub_instance);

    const ok_result = await i.cancel_order(jwt, 1);
    const ng_result = await i.cancel_order(jwt, 2);

    expect(ok_result).to.equal(true);
    expect(ng_result).to.equal(undefined);
  });
})
