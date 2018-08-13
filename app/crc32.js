
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

// application
window.App = {
  start: function() {
    var self = this;
    // print network name and CRC32 contract address
    document.getElementById("contractaddress").innerHTML = contractAddress;
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
  },

  // CRC32 function
  CRC32: function() {
    var self = this;
    let data = document.getElementById("data").value;
    try {
      let contract = web3.eth.contract(contractABI).at(contractAddress);
      contract.crc32("123456789", 9, function(error, result) {
        if (!error) {
          document.getElementById("crc32result").innerHTML = result;
        } else {
          console.warn("crc32() failed!");
          document.getElementById("crc32result").innerHTML = error;
        }
      });
    } catch (error) {
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
    // you may use Infura instead of local node if you provide an API key
    //window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/" + infuraAPIKey));
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
