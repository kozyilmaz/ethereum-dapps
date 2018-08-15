
// Infura API key, please check web3 provider loading at the bottom
let infuraAPIKey = "";

// ERC20 compliant minimum ABI
let ERC20ContractABI = [
    // balanceOf (function)
    {
      "constant": true,
      "inputs": [{"name":"_owner","type":"address"}],
      "name": "balanceOf",
      "outputs": [{"name": "","type":"uint256"}],
      "type": "function"
    },
    // transfer (function)
    {
      "constant": false,
      "inputs": [{"name": "_to","type": "address"},{"name":"_value","type":"uint256"}],
      "name": "transfer",
      "outputs": [{"name":"","type":"bool"}],
      "type": "function"
    },

    // transferFrom (function)
    {
      "constant": false,
      "inputs": [{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
      "name": "transferFrom",
      "outputs": [{"name":"","type":"bool"}],
      "type": "function"
    },
    // Transfer (event)
    {
      "anonymous": false,
      "inputs": [{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],
      "name": "Transfer",
      "type": "event"
    },
    // name (function)
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs":[{"name":"","type":"string"}],
      "type": "function"
    },
    // symbol (function)
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{"name":"","type":"string"}],
      "type": "function"
    },
    // decimals (function)
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "name":"","type":"uint8"}],
      "type": "function"
    }
];

// NoNameToken (ERC20-compliant) address
let NNTTokenAddress = "0x0edd6c7576e31a740e7bef46388bf91057631b60";

// default account
var account;

window.App = {
  start: function() {
    var self = this;

    // check Metamask availability
    if (web3.currentProvider.isMetaMask) {
      document.getElementById("providernote").innerHTML = "Metamask is available, please set network to Rinkeby!"
    } else {
      document.getElementById("providernote").innerHTML = "Metamask is NOT available, please use a local node or set 'infuraAPIKey' in crc32.js and connect to Rinkeby network! Some functionality will not work without Metamask";
    }
    // print network name and CRC32 contract address
    document.getElementById("contractaddress").innerHTML = NNTTokenAddress;
    // Etherscan link of the smart contract
    document.getElementById("etherscanurl").href = "https://rinkeby.etherscan.io/address/" + NNTTokenAddress + "#code";

    // get the initial account balance (requires Metamask/Mist)
    web3.eth.getAccounts(function(error, accounts) {
      if (error != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accounts.length == 0) {
        alert("Couldn't get any accounts, probably Metamask/Mist is not present!");
        return;
      }
      // store default account for later use
      account = accounts[0];
      console.log("default account is:" + account);

      document.getElementById("defaultaddress").innerHTML = account;
      self.getEtherBalance(account, "etherbalanceauto");
      self.getTokenBalance(account, ERC20ContractABI, NNTTokenAddress, "tokenbalanceauto");
    });
  },

  // get ether balance
  getEtherBalance: function(walletAddress, outElement) {
    var self = this;
    web3.eth.getBalance(walletAddress, function (error, wei) {
      if (!error) {
        let etherbalance = web3.fromWei(wei, 'ether');
        document.getElementById(outElement).innerHTML = etherbalance + " ETH";
      } else {
        console.warn("getBalance() failed!");
        document.getElementById(outElement).innerHTML = error;
      }
    });
  },

  // get any token balance
  getTokenBalance: function(walletAddress, contractABI, contractAddress, outElement) {
    var self = this;
    let contract = web3.eth.contract(contractABI).at(contractAddress);
    contract.balanceOf(walletAddress, function(error, tokenbalance) {
      if (!error) {
        // decimals()
        contract.decimals(function (error, decimals) {
          if (!error) {
            tokenbalance = tokenbalance.div(10**decimals);
            // name()
            contract.name(function (error, name) {
              if (!error) {
                // symbol
                contract.symbol(function (error, symbol) {
                  if (!error) {
                    document.getElementById(outElement).innerHTML = tokenbalance + " " + symbol + " (" + name + ")" ;
                  } else {
                    console.warn("symbol() failed!");
                    document.getElementById(outElement).innerHTML = error;
                  }
                });
              } else {
                console.warn("name() failed!");
                document.getElementById(outElement).innerHTML = error;
              }
            });
          } else {
            console.warn("decimals() failed!");
            document.getElementById(outElement).innerHTML = error;
          }
        });
      } else {
        console.warn("balanceOf() failed!");
        document.getElementById(outElement).innerHTML = error;
        // if QJuery is used statement above gets simpler
        //$('#' + outElement).html(error);
      }
    });
  },

  // get total balance (ETH + NNT)
  getTotalBalance: function() {
    var self = this;
    let walletAddress = document.getElementById("address").value;
    try {
      self.getEtherBalance(walletAddress, "etherbalancemanual");
      self.getTokenBalance(walletAddress, ERC20ContractABI, NNTTokenAddress, "tokenbalancemanual");
    } catch (error) {
      document.getElementById("etherbalancemanual").innerHTML = error;
      document.getElementById("tokenbalancemanual").innerHTML = error;
    }
  },

  // get custom token balance
  getCustomTokenBalance: function() {
    var self = this;
    let walletAddress = document.getElementById("ethaddress").value;
    if (web3.isAddress(walletAddress) != true) {
      document.getElementById("customtokenbalance").innerHTML = "error: invalid wallet address";
      return;
    }
    let contractAddress = document.getElementById("tokenaddress").value;
    if (web3.isAddress(contractAddress) != true) {
      document.getElementById("customtokenbalance").innerHTML = "error: invalid token address";
      return;
    }
    self.getTokenBalance(walletAddress, ERC20ContractABI, contractAddress, "customtokenbalance");
  },

  // send ether
  sendEther: function() {
    var self = this;
    let amount = parseFloat(document.getElementById("ethamount").value);
    if (isNaN(amount)) {
      document.getElementById("sendethstatus").innerHTML = "error: invalid amount";
      return;
    }
    let toAddress = document.getElementById("toaddress").value;
    if (web3.isAddress(toAddress) != true) {
      document.getElementById("sendethstatus").innerHTML = "error: invalid sending address";
      return;
    }

    // update status before sending the transaction
    document.getElementById("sendethstatus").innerHTML = "Initiating transaction... (please wait)";

    // send ether to any address from default address
    web3.eth.sendTransaction({from:account, to:toAddress, value:web3.toWei(amount, "ether")}, function(error, transactionHash) {
      if (!error) {
        document.getElementById("sendethstatus").innerHTML = "Transaction sent with hash: " + transactionHash;
        // update balance
        self.getEtherBalance(account, "etherbalanceauto");
      } else {
        document.getElementById("sendethstatus").innerHTML = error;
      }
    });
  },

  // send ERC20 token
  sendToken: function() {
    var self = this;
    let contractAddress = document.getElementById("erc20address").value;
    if (web3.isAddress(contractAddress) != true) {
      document.getElementById("sendtokenstatus").innerHTML = "error: invalid token address";
      return;
    }
    let amount = parseFloat(document.getElementById("tokenamount").value);
    if (isNaN(amount)) {
      document.getElementById("sendtokenstatus").innerHTML = "error: invalid amount";
      return;
    }
    let toTokenAddress = document.getElementById("totokenaddress").value;
    if (web3.isAddress(toTokenAddress) != true) {
      document.getElementById("sendtokenstatus").innerHTML = "error: invalid token address";
      return;
    }
    // ready
    document.getElementById("sendtokenstatus").innerHTML = "Initiating transaction... (please wait)" ;

    let contract = web3.eth.contract(ERC20ContractABI).at(contractAddress);
    // decimals()
    contract.decimals(function (error, decimals) {
      if (!error) {
        // blockNumber
        web3.eth.getBlockNumber(function(error, blockNumber) {
          if (!error) {
            // transfer()
            contract.transfer(toTokenAddress, amount * (10**decimals), function(error, result) {
              if (!error) {
                document.getElementById("sendtokenstatus").innerHTML = "Waiting for the 'Transfer' event" ;
                // catch Transfer event
                var transferEvent = contract.Transfer({}, {fromBlock: blockNumber, toBlock: 'latest'});
                transferEvent.watch(function(error, result) {
                  if (!error) {
                    document.getElementById("sendtokenstatus").innerHTML = "from: " + result.args.from + "<br />" + "to: " + result.args.to + "<br />" + "value: " + (result.args.value / (10**decimals));
                    // update balance
                    self.getEtherBalance(account, "etherbalanceauto");
                  } else {
                    console.warn("transfer() failed!");
                    document.getElementById("sendtokenstatus").innerHTML = error;
                    return;
                  }
                });
              } else {
                console.warn("transfer() failed!");
                document.getElementById("sendtokenstatus").innerHTML = error;
                return;
              }
            });
          } else {
            console.warn("blockNumber() failed!");
            document.getElementById("sendtokenstatus").innerHTML = error;
            return;
          }
        });
      } else {
        console.warn("decimals() failed!");
        document.getElementById("sendtokenstatus").innerHTML = error;
        return;
      }
    });
  }

};

// hooking up web3 provider
window.addEventListener('load', function() {
  // checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - infura or localhost
    console.log('No Web3 Detected... using HTTP Provider')
    if (!infuraAPIKey || infuraAPIKey === "") {
      // use local node
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    } else {
      // use Infura
      window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/" + infuraAPIKey));
    }
  }
  App.start();
});
