const jwt = Symbol('jwt');
class Jwt {
  constructor(_jwt) {
    this[jwt] = _jwt;
  }
  get_jwt() { return this[jwt]; }
}


module.exports = Jwt;
