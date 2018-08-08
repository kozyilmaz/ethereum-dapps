var CRC32 = artifacts.require("./CRC32.sol");

module.exports = function(deployer) {
  deployer.deploy(CRC32);
};
