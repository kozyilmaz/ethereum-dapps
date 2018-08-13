pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CRC32.sol";

contract TestCRC32 {

  function testCRC32UsingDeployedContract() public {
    CRC32 crc = CRC32(DeployedAddresses.CRC32());

    uint expected;
    bytes memory buffer;

    // http://reveng.sourceforge.net/crc-catalogue/17plus.htm#crc.cat.crc-32
    buffer = '123456789'; expected = 0xCBF43926;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('123456789') != 0xCBF43926");

    buffer = 'IHATEMATH'; expected = 0x35C6AD5A;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('IHATEMATH') != 0x35C6AD5A");

    buffer = '1234567890'; expected = 0x261DAEE5;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('1234567890') != 0x261DAEE5");

    buffer = hex"1234567809"; expected = 0x55404551;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32(hex'1234567809') != 0x55404551");

    // partial crc32
    buffer = '123456789ABCDEF'; expected = 0xCBF43926;
    Assert.equal(crc.crc32(buffer, 9), expected, "partial (9 char) crc32('123456789ABCDEF') != 0xCBF43926");
  }

  function testCRC32WithNewInstantiation() public {
    CRC32 crc = new CRC32();

    uint expected;
    bytes memory buffer;

    // http://reveng.sourceforge.net/crc-catalogue/17plus.htm#crc.cat.crc-32
    buffer = '123456789'; expected = 0xCBF43926;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('123456789') != 0xCBF43926");

    buffer = 'IHATEMATH'; expected = 0x35C6AD5A;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('IHATEMATH') != 0x35C6AD5A");

    buffer = '1234567890'; expected = 0x261DAEE5;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32('1234567890') != 0x261DAEE5");

    buffer = hex"1234567809"; expected = 0x55404551;
    Assert.equal(crc.crc32(buffer, buffer.length), expected, "crc32(hex'1234567809') != 0x55404551");

    // partial crc32
    buffer = '123456789ABCDEF'; expected = 0xCBF43926;
    Assert.equal(crc.crc32(buffer, 9), expected, "partial (9 char) crc32('123456789ABCDEF') != 0xCBF43926");
  }

}
