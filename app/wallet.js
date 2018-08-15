
// Infura API key, please check web3 provider loading at the bottom
let infuraAPIKey = "";

// ERC20 compliant minimum ABI
let ERC20ContractABI = [
    // balanceOf
    {
      "constant": true,
      "inputs": [{"name":"_owner","type":"address"}],
      "name": "balanceOf",
      "outputs": [{"name": "","type":"uint256"}],
      "type": "function"
    },
    // name
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs":[{"name":"","type":"string"}],
      "type": "function"
    },

    // decimals
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
    web3.eth.getAccounts(function(error, accs) {
      if (error != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts, probably Metamask/Mist is not present!");
        return;
      }
      var accounts = accs;
      var account = accounts[0];
      console.log("default account is:" + account);

      document.getElementById("defaultaddress").innerHTML = account;
      self.getEtherBalance(account, "etherbalanceauto");
      self.getTokenBalance(account, ERC20ContractABI, NNTTokenAddress, "tokenbalanceauto");
    });
  },

  // gets ether balance
  getEtherBalance: function(walletAddress, outElement) {
    var self = this;
    web3.eth.getBalance(walletAddress, function (error, wei) {
      if (!error) {
        let etherbalance = web3.fromWei(wei, 'ether');
        console.log("ETH = " + etherbalance.toString());
        document.getElementById(outElement).innerHTML = etherbalance + " ETH";
      } else {
        console.warn("getBalance() failed!");
        document.getElementById(outElement).innerHTML = error;
      }
    });
  },

  // gets token balance
  getTokenBalance: function(walletAddress, contractABI, contractAddress, outElement) {
    var self = this;
    let contract = web3.eth.contract(contractABI).at(contractAddress);
    contract.balanceOf(walletAddress, function(error, tokenbalance) {
      if (!error) {
        contract.decimals(function (error, decimals) {
          if (!error) {
            tokenbalance = tokenbalance.div(10**decimals);
            console.log(tokenbalance.toString());
            document.getElementById(outElement).innerHTML = tokenbalance + " Token";
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

  // gets total balance (ETH + NNT)
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

  // gets custom token balance
  getCustomTokenBalance: function() {
    var self = this;
    let walletAddress = document.getElementById("ethaddress").value;
    let contractAddress = document.getElementById("tokenaddress").value;
    self.getTokenBalance(walletAddress, ERC20ContractABI, contractAddress, "customtokenbalance");
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
