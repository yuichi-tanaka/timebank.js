
class IMeRepository {
  constructor(){
    if(this.constructor === IMeRepository) {
      throw new Error('Can not construct interface');
    }
    if(this.find === IMeRepository.prototype.find) {
      throw new Error('find is not implemented');
    }
    if(this.holdings === IMeRepository.prototype.holdings) {
      throw new Error('holdings is not implemented');
    }
    if(this.fetch_orders === IMeRepository.prototype.fetch_orders) {
      throw new Error('fetch_orders is not implemented');
    }
    if(this.create_order === IMeRepository.prototype.create_order) {
      throw new Error('create_order is not implemented');
    }
    if(this.cancel_order === IMeRepository.prototype.cancel_order) {
      throw new Error('cancel_order is not implemented');
    }
  }
  async find(jwt) {throw new Error('Not Implemented');}
  async holdings(jwt) {throw new Error('Not Implemented');}
  async fetch_orders(jwt) {throw new Error('Not Implemented');}
  async create_order(jwt, orders) {throw new Error('Not Implemented');}
  async cancel_order(jwt, ordering_id) {throw new Error('Not Implemented');}
}
module.exports = IMeRepository;
