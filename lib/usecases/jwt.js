const IJwtRepository = require('./jwt_repository');
const repository = Symbol('repository');

class Jwt {
  constructor(_repository) {
    if( !(_repository instanceof IJwtRepository) ) {
      throw new Error('repository must inherits IJwtRepository');
    }
    this[repository] = _repository;
  }
  async authenticate(token, secret) {
    const res = await this[repository].authenticate(token, secret);
    return res;
  }
}
module.exports = Jwt;
