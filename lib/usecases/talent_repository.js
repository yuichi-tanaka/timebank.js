
class ITalentRepository {
  constructor(){
    if(this.constructor === ITalentRepository) {
      throw new Error('Can not construct interface');
    }
    if(this.fetch === ITalentRepository.prototype.fetch) {
      throw new Error('fetch is not implemented');
    }
    if(this.history === ITalentRepository.prototype.history) {
      throw new Error('history is not implemented');
    }
  }
  async fetch() {throw new Error('Not Implemented');}
  async history() {throw new Error('Not Implemented');}
}
module.exports = ITalentRepository;
