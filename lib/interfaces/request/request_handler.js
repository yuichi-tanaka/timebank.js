
class IRequestHandler {
  constructor() {
    if(this.constructor === IRequestHandler) {
      throw new Error('Can not construct interface');
    }
    if(this.request === IRequestHandler.prototype.request) {
      throw new Error('request is not implemented');
    }
    if(this.post === IRequestHandler.prototype.post) {
      throw new Error('post is not implemented');
    }
    if(this.del === IRequestHandler.prototype.del) {
      throw new Error('del is not implemented');
    }
  }
  request(_paths, _headers, _params) {throw new Error('Not Implemented');}
  post(_paths, _headers, _params) {throw new Error('Not Implemented');}
  del(_paths, _headers, _params) {throw new Error('Not Implemented');}
}
module.exports = IRequestHandler;
