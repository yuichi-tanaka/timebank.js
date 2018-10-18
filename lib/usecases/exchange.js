const IExchangeRepository = require('./exchange_repository');
const repository = Symbol('repository');

class Exchange {
  constructor(_repository) {
    if( !(_repository instanceof IExchangeRepository) ) {
      throw new Error('repository must inherits IExchangeRepository');
    }
    this[repository] = _repository;
  }

  async exchange(jwt, talent_id) {
    const res = await this[repository].fetch(jwt, talent_id);
    return res;
  }

}
module.exports = Exchange;
