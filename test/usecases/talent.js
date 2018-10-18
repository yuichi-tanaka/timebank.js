const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const target_path = process.env.PWD + '/lib/usecases/talent';
const interface_path = process.env.PWD + '/lib/usecases/talent_repository';
const talent_entity_path = process.env.PWD + '/lib/entities/talent';
const status_entity_path = process.env.PWD + '/lib/entities/status';

const target = require(target_path);
const talent_entity = require(talent_entity_path);
const status_entity = require(status_entity_path);

const s_interface = require(interface_path);
const s_stub = class extends s_interface {
  constructor(){
    super();
  }
  async fetch(jwt) {}
  async history(jwt, talent_id) {}
};
const jwt = 'aaaaa-bbbbb';


const _talents = [
  {
    talent_id: 1,
    talent_name: 'サンプルタレント',
    floating_second: 18000,
    subscription_price: 30,
    price: 35,
    opening_price: 32.5,
    closing_price: 34.3,
    high: 35.5,
    low: 32.5,
    volume: 2000,
    turnover: 70000,
    date : '2018-10-17',
  },
  {
    talent_id: 2,
    talent_name: 'サンプルタレント2',
    floating_second: 36000,
    subscription_price: 60,
    price: 65,
    opening_price: 62.5,
    closing_price: 64.3,
    high: 65.5,
    low: 62.5,
    volume: 8000,
    turnover: 280000,
    date : '2018-10-17',
  },
];

const _history = {
  talent_id: 1,
  talent_name: 'サンプルタレント',
  floating_second: 18000,
  subscription_price: 30,
  price: 35,
  history: [
    {
      opening_price: 32.5,
      closing_price: 34.3,
      high: 35.5,
      low: 32.5,
      volume: 2000,
      turnover: 70000,
      date : '2018-10-16',
    },
    {
      opening_price: 30.5,
      closing_price: 30.3,
      high: 31.5,
      low: 30.5,
      volume: 300,
      turnover: 6000,
      date : '2018-10-15',
    }
  ]
};

describe('talent usecase', () => {

  it('should throw exeptions when the argument is null', () => {
    expect(() => new target()).to.throw('repository must inherits ITalentRepository');
  })

  const stub_instance = new s_stub();
  it('#talents', async () => {
    let res = []
    for( let t of _talents) {
      let _t = new talent_entity(
        t.talent_id,
        t.talent_name,
        t.floating_second,
        t.subscription_price,
        t.price,
      )
      _t.status = new status_entity(
        t.opening_price,
        t.closing_price,
        t.high,
        t.low,
        t.volume,
        t.turnover,
        t.date
      );
      res.push(_t);
    }

    const s = sinon.stub(stub_instance, 'fetch');
    s.returns(res);
    const i = new target(stub_instance);
    const result = await i.talents(jwt);
    expect(result.length).to.equal(_talents.length);
    expect(result[0].get_talent_id()).to.equal(_talents[0].talent_id);
    expect(result[0].get_talent_name()).to.equal(_talents[0].talent_name);
    expect(result[0].get_floating_second()).to.equal(_talents[0].floating_second);
    expect(result[0].get_subscription_price()).to.equal(_talents[0].subscription_price);
    expect(result[0].get_price()).to.equal(_talents[0].price);
    expect(result[0].status.get_opening_price()).to.equal(_talents[0].opening_price);
    expect(result[0].status.get_closing_price()).to.equal(_talents[0].closing_price);
    expect(result[0].status.get_high()).to.equal(_talents[0].high);
    expect(result[0].status.get_low()).to.equal(_talents[0].low);
    expect(result[0].status.get_volume()).to.equal(_talents[0].volume);
    expect(result[0].status.get_turnover()).to.equal(_talents[0].turnover);
    expect(result[0].status.get_date()).to.equal(_talents[0].date);

    expect(result[1].get_talent_id()).to.equal(_talents[1].talent_id);
    expect(result[1].get_talent_name()).to.equal(_talents[1].talent_name);
    expect(result[1].get_floating_second()).to.equal(_talents[1].floating_second);
    expect(result[1].get_subscription_price()).to.equal(_talents[1].subscription_price);
    expect(result[1].get_price()).to.equal(_talents[1].price);
    expect(result[1].status.get_opening_price()).to.equal(_talents[1].opening_price);
    expect(result[1].status.get_closing_price()).to.equal(_talents[1].closing_price);
    expect(result[1].status.get_high()).to.equal(_talents[1].high);
    expect(result[1].status.get_low()).to.equal(_talents[1].low);
    expect(result[1].status.get_volume()).to.equal(_talents[1].volume);
    expect(result[1].status.get_turnover()).to.equal(_talents[1].turnover);
    expect(result[1].status.get_date()).to.equal(_talents[1].date);
  });

  it('#history',async () => {
    let obj = new talent_entity(
      _history.talent_id,
      _history.talent_name,
      _history.floating_second,
      _history.subscription_price,
      _history.price,
    );
    obj.status = new status_entity(
      _talents[0].opening_price,
      _talents[0].closing_price,
      _talents[0].high,
      _talents[0].low,
      _talents[0].volume,
      _talents[0].turnover,
      _talents[0].date
    );
    obj.history = []
    for( let h of _history.history) {
      obj.history.push(new status_entity(
        h.opening_price,
        h.closing_price,
        h.high,
        h.low,
        h.volume,
        h.turnover,
        h.date
      ));
    }

    const s = sinon.stub(stub_instance, 'history');
    s.returns(obj);
    const i = new target(stub_instance);

    const result = await i.history(jwt, 1);
    expect(result.get_talent_id()).to.equal(_history.talent_id);
    expect(result.get_talent_name()).to.equal(_history.talent_name);
    expect(result.get_floating_second()).to.equal(_history.floating_second);
    expect(result.get_subscription_price()).to.equal(_history.subscription_price);
    expect(result.get_price()).to.equal(_history.price);
    expect(result.status.get_opening_price()).to.equal(_talents[0].opening_price);
    expect(result.status.get_closing_price()).to.equal(_talents[0].closing_price);
    expect(result.status.get_high()).to.equal(_talents[0].high);
    expect(result.status.get_low()).to.equal(_talents[0].low);
    expect(result.status.get_volume()).to.equal(_talents[0].volume);
    expect(result.status.get_turnover()).to.equal(_talents[0].turnover);
    expect(result.status.get_date()).to.equal(_talents[0].date);
    expect(result.history.length).to.equal(2);
    expect(result.history[0].get_opening_price()).to.equal(_history.history[0].opening_price);
    expect(result.history[0].get_closing_price()).to.equal(_history.history[0].closing_price);
    expect(result.history[0].get_high()).to.equal(_history.history[0].high);
    expect(result.history[0].get_low()).to.equal(_history.history[0].low);
    expect(result.history[0].get_volume()).to.equal(_history.history[0].volume);
    expect(result.history[0].get_turnover()).to.equal(_history.history[0].turnover);
    expect(result.history[0].get_date()).to.equal(_history.history[0].date);

    expect(result.history[1].get_opening_price()).to.equal(_history.history[1].opening_price);
    expect(result.history[1].get_closing_price()).to.equal(_history.history[1].closing_price);
    expect(result.history[1].get_high()).to.equal(_history.history[1].high);
    expect(result.history[1].get_low()).to.equal(_history.history[1].low);
    expect(result.history[1].get_volume()).to.equal(_history.history[1].volume);
    expect(result.history[1].get_turnover()).to.equal(_history.history[1].turnover);
    expect(result.history[1].get_date()).to.equal(_history.history[1].date);
  });
})
