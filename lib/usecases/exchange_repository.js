
class IExchangeRepository {
  constructor(){
    if(this.constructor === IExchangeRepository) {
      throw new Error('Can not construct interface');
    }
    if(this.fetch === IExchangeRepository.prototype.fetch) {
      throw new Error('fetch is not implemented');
    }
  }
  async fetch() {throw new Error('Not Implemented');}
}
module.exports = IExchangeRepository;
