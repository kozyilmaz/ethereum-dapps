
// Infura API key, please check web3 provider loading at the bottom
let infuraAPIKey = "";

// application
window.App = {
  start: function() {
    var self = this;

    // fill provider and network details
    document.getElementById("providername").innerHTML = self.getCurrentProviderName();
    self.getNetworkName("networkname");
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
