
// Infura API key, please check web3 provider loading at the bottom
let infuraAPIKey = "";

// CRC32 smart contract minimum ABI
let contractABI = [
    // crc32
    {
      "constant": true,
      "inputs": [{"name":"_buffer","type":"bytes"},{"name":"_size","type":"uint256"}],
      "name": "crc32",
      "outputs": [{"name":"","type":"uint32"}],
      "type": "function"
    }
];

// contract address
let contractAddress = "0x0f7363cbad2f8d9f63bb64aad5dabaf3f1ff1a0c";

// check if string is hexadecimal (starts with '0x' and is valid)
function isHex(str) {
    var regexp = /\b0x[0-9A-F]+\b/i;
    return regexp.test(str);
}

// application
window.App = {
  start: function() {
    var self = this;

    // check Metamask availability
    if (web3.currentProvider.isMetaMask) {
      document.getElementById("metamaskavailability").innerHTML = "Metamask available"
    } else {
      document.getElementById("metamaskavailability").innerHTML = "Metamask is NOT available, provider is '" + self.getCurrentProviderName() + "'. Please set 'infuraAPIKey' in wallet.js if you don't use Metamask/Mist/localhost";
    }
    // print network name and CRC32 contract address
    document.getElementById("contractaddress").innerHTML = contractAddress;
    self.getNetworkName("networkname");
    // Etherscan link of the smart contract
    document.getElementById("etherscanurl").href = "https://rinkeby.etherscan.io/address/" + contractAddress + "#code";
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

  // CRC32 function
  CRC32: function() {
    var self = this;

    let size;
    let buffer;
    let data = document.getElementById("data").value;
    try {
      // check if string is hexadecimal or ASCII
      if (isHex(data)) {
        // pad '0' before the last character for odd length
        if ((data.length % 2) != 0) {
          var l = data.length;
          data = data.substring(0, l-1) + "0" + data.substring(l-1);
        }
        buffer = data;
      } else {
        buffer = web3.fromAscii(data);
      }
      size = (buffer.length-2)/2;
      // Solidity will get a byte array without '0x'
      console.log("crc32('" + data + "') [buffer: " + buffer + " size: " + size + "]");

      let contract = web3.eth.contract(contractABI).at(contractAddress);
      contract.crc32(buffer, size, function(error, result) {
        if (!error) {
          document.getElementById("crc32result").innerHTML = "0x" + result.toString(16);
        } else {
          console.warn("crc32() failed!");
          document.getElementById("crc32result").innerHTML = error;
        }
      });
    } catch (error) {
      console.warn("invalid data");
      document.getElementById("crc32result").innerHTML = "invalid data";
    }
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
