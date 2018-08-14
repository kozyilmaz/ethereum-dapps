
// Infura API key, please check web3 provider loading at the bottom
let infuraAPIKey = "";

// ERC20 compliant minimum ABI
let contractABI = [
    // balanceOf
    {
      "constant": true,
      "inputs": [{"name":"_owner","type":"address"}],
      "name": "balanceOf",
      "outputs": [{"name": "","type":"uint256"}],
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

// ERC20 token address
let contractAddress = "0x0edd6c7576e31a740e7bef46388bf91057631b60";

window.App = {
  start: function() {
    var self = this;

    // check Metamask availability
    if (web3.currentProvider.isMetaMask) {
      document.getElementById("metamaskavailability").innerHTML = "Metamask available"
    } else {
      if (self.getCurrentProviderName() !== "infura") {
        document.getElementById("metamaskavailability").innerHTML = "Metamask is NOT available, provider is '" + self.getCurrentProviderName() + "'. Please set 'infuraAPIKey' in wallet.js if want to use Infura!";
      } else {
        document.getElementById("metamaskavailability").innerHTML = "Metamask is NOT available, provider is '" + self.getCurrentProviderName() + "'";
      }
    }
    // print network name and CRC32 contract address
    document.getElementById("contractaddress").innerHTML = contractAddress;
    self.getNetworkName("networkname");
    // Etherscan link of the smart contract
    document.getElementById("etherscanurl").href = "https://rinkeby.etherscan.io/address/" + contractAddress + "#code";

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

      self.getEtherBalance(account, "etherbalanceauto");
      self.getTokenBalance(account, "tokenbalanceauto");
    });
  },

  // copied from https://ethereum.stackexchange.com/questions/24266/elegant-way-to-detect-current-provider-int-web3-js
  getCurrentProviderName: function() {
    if (window.web3.currentProvider.isMetaMask)
      return 'metamask';
    if (window.web3.currentProvider.isTrust)
      return 'trust';
    if (typeof window.SOFA !== 'undefined')
      return 'toshi';
    if (typeof window.__CIPHER__ !== 'undefined')
      return 'cipher';
    if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
      return 'mist';
    if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
      return 'parity';
    if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
      return 'infura';
    if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
      return 'localhost';
    return 'unknown';
  },

  // gets network name
  getNetworkName: function(elementName) {
    var self = this;
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1": console.log('Mainnet'); document.getElementById(elementName).innerHTML = "Mainnet"; break;
        case "2": console.log('Morden (Test)'); document.getElementById(elementName).innerHTML = "Morden (Test)"; break;
        case "3": console.log('Ropsten (Test)'); document.getElementById(elementName).innerHTML = "Ropsten (Test)"; break;
        case "4": console.log('Rinkeby (Test)'); document.getElementById(elementName).innerHTML = "Rinkeby (Test)"; break;
        case "42": console.log('Kovan (Test)'); document.getElementById(elementName).innerHTML = "Kovan (Test)"; break;
        default: console.log('Unknown'); document.getElementById(elementName).innerHTML = "Unknown";
      }
    })
  },

  // gets ether balance
  getEtherBalance: function(walletAddress, elementName) {
    var self = this;
    web3.eth.getBalance(walletAddress, function (error, wei) {
      if (!error) {
        let etherbalance = web3.fromWei(wei, 'ether');
        console.log("ETH = " + etherbalance.toString());
        document.getElementById(elementName).innerHTML = etherbalance + " ETH";
      } else {
        console.warn("getBalance() failed!");
        document.getElementById(elementName).innerHTML = error;
      }
    });
  },

  // gets token balance
  getTokenBalance: function(walletAddress, elementName) {
    var self = this;
    let contract = web3.eth.contract(contractABI).at(contractAddress);
    contract.balanceOf(walletAddress, function(error, tokenbalance) {
      if (!error) {
        contract.decimals(function (error, decimals) {
          if (!error) {
            tokenbalance = tokenbalance.div(10**decimals);
            console.log("NST = " + tokenbalance.toString());
            document.getElementById(elementName).innerHTML = tokenbalance + " NST";
          } else {
            console.warn("decimals() failed!");
            document.getElementById(elementName).innerHTML = error;
          }
        });
      } else {
        console.warn("balanceOf() failed!");
        document.getElementById(elementName).innerHTML = error;
        // if QJuery is used statement above gets simpler
        //$('#' + elementName).html(error);
      }
    });
  }

};

// get ether balance of the given address
window.getBalance = () => {
  let walletAddress = document.getElementById("address").value
  try {
    App.getEtherBalance(walletAddress, "etherbalancemanual");
    App.getTokenBalance(walletAddress, "tokenbalancemanual");
  } catch (error) {
    document.getElementById("etherbalancemanual").innerHTML = error;
    document.getElementById("tokenbalancemanual").innerHTML = error;
  }
}

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
