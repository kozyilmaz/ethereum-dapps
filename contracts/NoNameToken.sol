pragma solidity ^0.4.24;

import './OracleOwnable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';

/**
 * @title NoNameToken
 * @dev ERC20 Token, where all tokens are pre-assigned to the creator.
 * A certain percentage of tokens will be sent to `Crowdsale` contract
 */
contract NoNameToken is StandardBurnableToken, OracleOwnable {

  string public constant name = "NoNameToken";
  string public constant symbol = "NNT";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }
}
