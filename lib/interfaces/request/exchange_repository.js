
const IRequestHandler = require('./request_handler');
const IExchangeRepository = require('../../usecases/exchange_repository');
const ExchangeEntity = require('../../entities/exchange');
const handle = Symbol('handle');

class ExchangeRepository extends IExchangeRepository {
  constructor(_handle) {
    super();
    if(!(_handle instanceof IRequestHandler)) {
      throw new Error("handle must inherits IRequestHandler");
    }
    this[handle] = _handle;
  }

  async fetch(jwt, talent_id) {
    const result = await this[handle].request(['exchanges', talent_id], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const status = result.get_body().status;
    let res_exchange = {};
    res_exchange.price = status.current_price;
    res_exchange.buy_order = [];
    res_exchange.sell_order = [];

    for( let b of status.buy_order) {
      res_exchange.buy_order.push(
        new ExchangeEntity(
          'buy',
          b.price,
          b.second
        )
      );
    }

    for( let s of status.sell_order) {
      res_exchange.sell_order.push(
        new ExchangeEntity(
          'sell',
          s.price,
          s.second
        )
      );
    }
    return res_exchange;
  }
}
module.exports = ExchangeRepository;
