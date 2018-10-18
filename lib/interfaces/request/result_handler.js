

class IResultHandler {
  constructor() {
    if(this.constructor === IResultHandler) {
      throw new Error('Can not construct interface');
    }
    if(this.get_status === IResultHandler.prototype.get_status) {
      throw new Error('get_status is not implemented');
    }
    if(this.get_body === IResultHandler.prototype.get_body) {
      throw new Error('get_status is not implemented');
    }
  }
  get_status() {throw new Error('Not Implemented');}
  get_body() {throw new Error('Not Implemented');}
}
module.exports = IResultHandler;
