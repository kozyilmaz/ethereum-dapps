var CRC32 = artifacts.require("./CRC32.sol");

contract('CRC32', function() {
  it("should put 10000 MetaCoin in the first account", function() {
    return CRC32.deployed().then(function(instance) {
      return instance.crc32.call("123456789", 9);
    }).then(function(crc) {
    });
  });
});
