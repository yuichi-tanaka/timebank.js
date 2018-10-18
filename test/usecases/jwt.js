const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const target_path = process.env.PWD + '/lib/usecases/jwt';
const interface_path = process.env.PWD + '/lib/usecases/jwt_repository';
const jwt_entity_path = process.env.PWD + '/lib/entities/jwt';

const target = require(target_path);
const jwt_entity = require(jwt_entity_path);

const s_interface = require(interface_path);
const s_stub = class extends s_interface {
  constructor(){
    super();
  }
  async authenticate(token, secret) {}
};

const jwt = 'aaaaa-bbbbb-ccccc';

describe('jwt usecase', () => {

  it('should throw exeptions when the argument is null', () => {
    expect(() => new target()).to.throw('repository must inherits IJwtRepository');
  })

  const stub_instance = new s_stub();
  it('#authenticate',async () => {
    const obj = new jwt_entity(jwt);
    const s = sinon.stub(stub_instance, 'authenticate');
    s.returns(obj);
    const i = new target(stub_instance);
    const result = await i.authenticate('token_sample', 'secret_sample');
    expect(result.get_jwt()).to.equal(jwt);
  });
})
