var util = require('ethereumjs-util')

const CRC32 = artifacts.require('./CRC32.sol');

contract('CRC32', function () {
  let crc;

  beforeEach(async function () {
    crc = await CRC32.new();
  });

  it('should calculate string("123456789") checksum correctly', async function () {
    var s = "123456789";
    var m = util.bufferToHex(new Buffer(s, 'utf8'))
    const checksum = await crc.crc32(m, (m.length-2)/2);
    assert.equal(checksum, 0xCBF43926);
  });

  it('should calculate string("IHATEMATH") checksum correctly', async function () {
    var s = "IHATEMATH";
    var m = util.bufferToHex(new Buffer(s, 'utf8'));
    const checksum = await crc.crc32(m, (m.length-2)/2);
    assert.equal(checksum, 0x35C6AD5A);
  });

  it('should calculate string("1234567890") checksum correctly', async function () {
    var s = "1234567890";
    var m = util.bufferToHex(new Buffer(s, 'utf8'));
    const checksum = await crc.crc32(m, (m.length-2)/2);
    assert.equal(checksum, 0x261DAEE5);
  });

  it('should calculate hex(1234567809) checksum correctly', async function () {
    var s = "0x" + "1234567809"
    const checksum = await crc.crc32(s, (s.length-2)/2);
    assert.equal(checksum, 0x55404551);
  });

});
