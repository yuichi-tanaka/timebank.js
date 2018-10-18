const request_handler = require('./lib/infrastructures/request_handler');
const me_repository = require('./lib/interfaces/request/me_repository');
const jwt_repository = require('./lib/interfaces/request/jwt_repository');
const talent_repository = require('./lib/interfaces/request/talent_repository');
const exchange_repository = require('./lib/interfaces/request/exchange_repository');

const me = require('./lib/usecases/me');
const jwt = require('./lib/usecases/jwt');
const talent = require('./lib/usecases/talent');
const exchange = require('./lib/usecases/exchange');

const token = process.env.TIMEBANK_APP_KEY;
const secret = process.env.TIMEBANK_APP_SEC;

(async () => {
  if( !token || !secret){
    throw Error('usage TIMEBANK_APP_KEY=XXXXX TIMEBANK_SECRET=YYYY npm start');
  }
  const rh = request_handler();
  const j = new jwt(
    new jwt_repository(
      rh
    )
  );
  const jwt_sample = await j.authenticate(token, secret);
  const r_j = jwt_sample.get_jwt();

  // jwtここまで
  const m = new me(
    new me_repository(
      rh
    )
  );
  const sample = await m.current_status(r_j);
  const holdings_sample = await m.holdings(r_j);
  const orderings_sample = await m.orderings(r_j);

  // sample_order
  const orders = [
    {
      'talent_id': 13,
      'ordering_type': 'sell',
      'second': 10,
      'price' : 4.5
    }
  ]
  //const orders_sample = await m.create_order(r_j, orders);
  //console.dir(orders_sample);
  //const cancel_result = await m.cancel_order(r_j, 886868);
  //console.dir(cancel_result);
  console.dir(r_j);
  //console.dir(orderings_sample);
  console.dir(sample.get_profits_and_loses());

  //meここまで
  const t = new talent(
    new talent_repository(
      rh
    )
  );
  const talent_sample = await t.talents(r_j);
  console.dir(talent_sample[0].status.get_date());

  const history_sample = await t.history(r_j, 1);
  console.dir(history_sample);

  const e = new exchange(
    new exchange_repository(
      rh
    )
  );

  const exchange_sample = await e.exchange(r_j, 1);
  console.dir(exchange_sample);

})();
