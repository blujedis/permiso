import 'mocha';
import { assert } from 'chai';
import { permiso } from '../src';

const obj = {
  admin: 'admin',
  user: 'user',
  common: {
    landing: 'landing',
    login: 'login',
    reset: 'reset'
  }
};

function obfuscator(val) {

  let hash = 0;
  val += '';

  const strlen = val.length;

  if (strlen === 0)
    return hash;

  for (let i = 0; i < strlen; i++) {
    hash += val.charCodeAt(i);
  }

  return hash;

}

describe('Primevox API', () => {

  it('Should create namespace and validate.', () => {

    const perms = permiso({ ...obj }, 'app');
    const admin = perms.create().admin().toString();
    assert.equal(admin, 'app.admin');
    assert.equal(perms.validate(admin), true);

  });

  it('Should create NOT namespace and validate.', () => {

    const perms = permiso({ ...obj }, 'app');
    const admin = perms.create().admin().not().toString();
    assert.equal(admin, '!app.admin');
    assert.equal(perms.validate(admin), true);

  });

  it('Should create ANY namespace and validate.', () => {

    const perms = permiso({ ...obj }, 'app');
    const admin = perms.create().admin().any().toString();
    assert.equal(admin, 'app.admin.*');
    assert.equal(perms.validate(admin), true);

  });

  it('Should parse namespace.', () => {

    const perms = permiso({ ...obj }, 'app');
    const admin = perms.create().admin().any().toString();
    assert.equal(admin, 'app.admin.*');
    assert.deepEqual(perms.parse(admin),
      { domain: 'app', namespace: 'app.admin.*', clean: 'app.admin', hasAny: true, hasNot: false });

  });

  it('Should expand namespace.', () => {

    const perms = permiso({ ...obj }, 'app');
    const common = perms.create().common().any().toString();
    assert.deepEqual(perms.expand(common),
      ['app.common.landing', 'app.common.login', 'app.common.reset']);

  });

  it('Should check if Permiso has namespace.', () => {

    const perms = permiso({ ...obj }, 'app');

    const common = perms.create().common().any().toString();

    assert.equal(perms.has(common, 'app.common.*'), true);
    assert.equal(perms.has(common, ['app.common.*']), true);
    assert.equal(perms.has([common], ['app.common.*']), true);

  });

  it('Should obfuscate namespace then unobfuscate.', () => {

    const perms = permiso({ ...obj }, 'app', obfuscator);

    const common = perms.create().common().landing().toString();

    const obfuscated = perms.obfuscate(common);
    const unobfuscated = perms.unobfuscate(...obfuscated);

    assert.equal(unobfuscated[0], common);

  });

});
