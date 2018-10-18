const IRequestHandler = require('./request_handler');
const IMeRepository = require('../../usecases/me_repository');
const MeEntity = require('../../entities/me');
const OrderEntity = require('../../entities/order');
const HoldingEntity = require('../../entities/holding');
const handle = Symbol('handle');
class MeRepository extends IMeRepository {
  constructor(_handle) {
    super();
    if(!(_handle instanceof IRequestHandler)) {
      throw new Error("handle must inherits IRequestHandler");
    }
    this[handle] = _handle;
  }
  async find(jwt) {
    const result = await this[handle].request(['me'], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const user = result.get_body().user;
    const me = new MeEntity(
      user.gross_assets,
      user.profits_and_loses,
      user.buying_power
    );

    return me;
  }

  async holdings(jwt) {
    const result = await this[handle].request(['me', 'holdings'], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const holdings = result.get_body().holdings;
    let res_holdings = [];
    for( let h of holdings) {
      res_holdings.push(
        new HoldingEntity(
          h.talent_id,
          h.talent_name,
          h.second,
          h.current_price,
          h.average_cost,
          h.profits_and_loses
        )
      );
    }
    return res_holdings;
  }

  async fetch_orders(jwt) {
    const result = await this[handle].request(['me', 'orderings'], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const buy = result.get_body().orderings.buy;
    const sell = result.get_body().orderings.sell;
    let res_orderings = [];
    for( let o of buy) {
      res_orderings.push(
        new OrderEntity(
          o.ordering_id,
          'buy',
          o.talent_id,
          o.price,
          o.second,
          o.uncompleted_second,
        )
      );
    }
    for( let o of sell) {
      res_orderings.push(
        new OrderEntity(
          o.ordering_id,
          'sell',
          o.talent_id,
          o.price,
          o.second,
          o.uncompleted_second,
        )
      );
    }
    return res_orderings;
  }

  async create_order(jwt, orders) {
    const body = {
      "orderings": orders,
    };
    const result = await this[handle].post(['me', 'orderings'], {'authorization': jwt}, body);
    if( result.get_status() != 200) return;
    return true;
  }

  async cancel_order(jwt, ordering_id) {
    const result = await this[handle].del(['me', 'orderings', ordering_id], {'authorization': jwt});
    if( result.get_status() != 200) return;
    return true;
  }
}
module.exports = MeRepository;
