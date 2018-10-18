const ITalentRepository = require('./talent_repository');
const repository = Symbol('repository');

class Talent {
  constructor(_repository) {
    if( !(_repository instanceof ITalentRepository) ) {
      throw new Error('repository must inherits ITalentRepository');
    }
    this[repository] = _repository;
  }
  async talents(jwt) {
    const res = await this[repository].fetch(jwt);
    return res;
  }

  async history(jwt, talent_id) {
    const res = await this[repository].history(jwt, talent_id);
    return res;
  }
}
module.exports = Talent;
