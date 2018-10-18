
class IJwtRepository {
  constructor(){
    if(this.constructor === IJwtRepository) {
      throw new Error('Can not construct interface');
    }
    if(this.authenticate === IJwtRepository.prototype.authenticate) {
      throw new Error('authenticate is not implemented');
    }
  }
  async authenticate() {throw new Error('Not Implemented');}
}
module.exports = IJwtRepository;
