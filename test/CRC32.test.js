var CRC32Mock = artifacts.require("./CRC32.sol");

contract('CRC32', function () {

  beforeEach(async function () {
    this.crc = await CRC32Mock.new();
  });

  describe('max', function () {
    it('is correctly detected in first argument position', async function () {
      const result = await this.crc.crc32("123456789", 9);
      assert.equal(result, 0xCBF43926);
    });
  });

});
