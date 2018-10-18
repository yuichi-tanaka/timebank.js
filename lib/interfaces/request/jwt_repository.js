const IRequestHandler = require('./request_handler');
const IJwtRepository = require('../../usecases/jwt_repository');
const JwtEntity = require('../../entities/jwt');
const handle = Symbol('handle');

class JwtRepository extends IJwtRepository {
  constructor(_handle) {
    super();
    if(!(_handle instanceof IRequestHandler)) {
      throw new Error("handle must inherits IRequestHandler");
    }
    this[handle] = _handle;
  }
  async authenticate(token, secret) {
    const body = {
      auth: {
        application_key: token,
        application_secret: secret
      }
    };
    const auth = await this[handle].post(['authenticate'], {}, body);
    if( auth.get_status() != 201) return;
    const jwt = auth.get_body().jwt;
    const jwt_entity  = new JwtEntity(jwt);

    return jwt_entity;
  }
}
module.exports = JwtRepository;
