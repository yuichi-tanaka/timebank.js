const request = require('request');
const IRequestHandler = require('../interfaces/request/request_handler');
const IResultHandler = require('../interfaces/request/result_handler');

//private symbol
const handle = Symbol('handle');
const get_opts = Symbol('get_opts');
const get_post_opts = Symbol('get_post_opts');
const get_delete_opts = Symbol('get_delete_opts');
const get_url = Symbol('get_url');


const __TIMEBANK_END_POINT = "https://public.timebank.jp/"
const default_header = {
  'Content-Type': 'application/json',
}

class RequestHandler extends IRequestHandler {
  constructor(_handle) {
    super();
    this[handle] = _handle;
  }
  //public
  get_handle() { return this[handle]; }
  request(_paths, _headers = default_header, _params) {
    const url = this[get_url](_paths);
    const request_header =  Object.assign(default_header, _headers)
    const opts = this[get_opts](url, 'get', request_header);
    return new Promise((resolve, reject) => {
      this[handle](opts, (e, rs, b) => {
        if(e) return reject(e);
        if(!rs) return reject("request error");
        const request_result = new RequestResult(rs.statusCode, b);
        resolve(request_result);
      })
    })
  }

  post(_paths, _headers = default_header, _params) {
    const url = this[get_url](_paths);
    const request_header =  Object.assign(default_header, _headers)
    const opts = this[get_post_opts](url, request_header, _params);
    return new Promise((resolve, reject) => {
      this[handle](opts, (e, rs, b) => {
        if(e) return reject(e);
        if(!rs) return reject("request error");
        const request_result = new RequestResult(rs.statusCode, b);
        resolve(request_result);
      })
    })
  }

  del(_paths, _headers = default_header, _params=true) {
    const url = this[get_url](_paths);
    const request_header =  Object.assign(default_header, _headers)
    const opts = this[get_delete_opts](url, request_header, _params);
    return new Promise((resolve, reject) => {
      this[handle](opts, (e, rs, b) => {
        if(e) return reject(e);
        if(!rs) return reject("request error");
        const request_result = new RequestResult(rs.statusCode, b);
        resolve(request_result);
      })
    })
  }
  //private
  [get_url](args) {
    const path = args.join("/")
    return __TIMEBANK_END_POINT + path;
  }
  [get_opts](_url, _method, _headers) {
    return {
      url: _url,
      method: _method,
      headers: _headers,
      json: true
    }
  }

  [get_post_opts](_url,  _headers, _params) {
    return {
      url: _url,
      method: 'post',
      headers: _headers,
      json: _params
    }
  }

  [get_delete_opts](_url,  _headers, _params) {
    return {
      url: _url,
      method: 'delete',
      headers: _headers,
      json: _params
    }
  }
}

const status = Symbol('status');
const body = Symbol('body');
class RequestResult extends IResultHandler {
  constructor(_status, _body) {
    super();
    this[status] = _status;
    this[body] = _body;
  }
  get_status() {return this[status];}
  get_body() {return this[body];}
}

module.exports = () => {
  return new RequestHandler(request);
}
