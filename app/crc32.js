
// ERC20 compliant minimum ABI
let tokenABI = [
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
let tokenAddress = "";

// accounts helper
let accounts;
let account;

window.App = {
  start: function() {
    var self = this;

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
      accounts = accs;
      account = accounts[0];

      console.log("account is:" + account);

      self.getEtherBalance(account, "etherbalanceauto");
      self.getTokenBalance(account, "tokenbalanceauto");
    });

    self.getNetworkName("networkname");
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
  }

};

// hook up web3 provider
window.addEventListener('load', function() {
  // checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - infura or localhost
    console.log('No Web3 Detected... using HTTP Provider')
    // you may use Infura instead of local node if you provide an API key
    //window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/" + INFURA_API_KEY));
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
