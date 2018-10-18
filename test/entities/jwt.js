const chai = require('chai');
const expect = chai.expect;
const target_path = process.env.PWD + '/lib/entities/jwt';

const target = require(target_path);
describe('jwt entity', () => {
  const t_data  = {
    jwt: 'xxxxxxxxxxxxxyyyyyyyyyyyyyyyxxxxxxxxxx-aaaaaaaaaaaaa',
  };
  const instance = new target(
    t_data.jwt,
  );

  it("#get_jwt", () => {
    const _v = instance.get_jwt();
    expect(_v).to.equal(t_data.jwt);
  });
})
