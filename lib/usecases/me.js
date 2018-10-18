const IMeRepository = require('./me_repository');
const repository = Symbol('repository');

class Me {
  constructor(_repository) {
    if( !(_repository instanceof IMeRepository) ) {
      throw new Error('repository must inherits IMeRepository');
    }
    this[repository] = _repository;
  }
  async current_status(jwt) {
    const res = await this[repository].find(jwt);
    return res;
  }

  async holdings(jwt) {
    const res = await this[repository].holdings(jwt);
    return res;
  }

  async orderings(jwt) {
    const res = await this[repository].fetch_orders(jwt);
    return res;
  }

  async create_order(jwt, orders) {
    const res = await this[repository].create_order(jwt, orders);
    return res;
  }
  async cancel_order(jwt, ordering_id) {
    const res = await this[repository].cancel_order(jwt, ordering_id);
    return res;
  }
}
module.exports = Me;
