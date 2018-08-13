pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract OracleOwnable is Ownable {

  address public oracle;

  modifier onlyOracle() {
    require(msg.sender == oracle);
    _;
  }

  modifier onlyOracleOrOwner() {
    require(msg.sender == oracle || msg.sender == owner);
    _;
  }

  function setOracle(address newOracle) public onlyOwner {
    if (newOracle != address(0)) {
      oracle = newOracle;
    }
  }
}
