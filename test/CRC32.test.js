const CRC32 = artifacts.require('./CRC32.sol');

contract('CRC32', function () {
  let crc;

  beforeEach(async function () {
    crc = await CRC32.new();
  });

  it('should calculate hex(0x1234567809) checksum correctly', async function () {
    const checksum = await crc.crc32(0x1234567809, 5);
    assert.equal(checksum, 0x55404551);
  });

  it('should calculate string(0x123456789) checksum correctly', async function () {
  new Uint8Array("123456789")
    const checksum = await crc.crc32(new Uint8Array("123456789") , 9);
    assert.equal(checksum, 0xCBF43926);
  });

});
