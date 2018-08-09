const CRC32 = artifacts.require('./CRC32.sol');

contract('CRC32', function () {
  let crc;

  beforeEach(async function () {
    crc = await CRC32.new();
  });

  it('should receive funds', async function () {
    await crc.crc32('123456789', 9);
  });

});
