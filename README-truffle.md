# Truffle

### Dependencies on Linux
Install `npm` and `node` using the package manager with instructions found [here!](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

```sh
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo npm install -g express
$ sudo npm install -g truffle
$ sudo npm install -g ganache-cli
$ sudo npm install -g browserify
$ sudo ln -sf /usr/bin/truffle /usr/local/bin/truffle
```

### Dependencies on macOS
Install `npm` and `node` using the `node-$VERSION.pkg` macOS installer found [here!](https://nodejs.org/en/download/) (they will be installed in /usr/local/bin)

```sh
$ sudo npm install -g express
$ sudo npm install -g truffle
$ sudo npm install -g ganache-cli
$ sudo npm install -g browserify
```

### Setting up a Truffle smart contract project
```sh
# for each project create a Truffle folder structure and add them to version control
$ truffle init

# for each project, navigate into the project and create a package.json via
$ npm init

# package.json is created, add to version control
$ git add package.json
$ git commit package.json
$ git push

# install .env capability for development
$ npm install dotenv --save-dev

# install hd wallet provider for development
$ npm install truffle-hdwallet-provider --save-dev

# install lite-server for DApp development
$ npm install lite-server --save-dev

# add "dev" to package.json
   "scripts": {
+    "dev": "lite-server",
     "test": "echo \"Error: no test specified\" && exit 1"
   },

# add config for lite-server
$ cat bs-config.json
{
  "server": {
    "baseDir": ["./app", "./build/contracts"]
  }
}

# install OpenZeppelin smart contracts as base (latest version at the time was v1.11.0)
$ npm install openzeppelin-solidity

# this creates package-lock.json, add to version control
$ git add package-lock.json
$ git commit package-lock.json
$ git push

# everytime you had a fresh checkout, get dependencies via
$ npm install

# compile smart contracts
$ truffle compile

# test smart contracts
$ truffle test

# create an .env file to store wallet seed and infura api keys for smooth deployment
$ cat .env
MNEMONIC=<wallet seed phrases (may be Metamask)>
INFURA_API_KEY=<infura api key>

# deploy smart contracts on various networks
$ truffle migrate --network localhost
$ truffle migrate --network mainnet
$ truffle migrate --network ropsten
$ truffle migrate --network rinkeby

# serve static content with lite-server
$ npm run dev
```
