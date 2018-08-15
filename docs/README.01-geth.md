# Geth

## Install Geth Dependencies
Download latest `go` package from the [offical Go repository](https://golang.org/dl/) and uncompress it to `/usr/local`
```sh
$ sudo tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
```

Add the following lines to the end of `$HOME/.profile`
```sh
# add Go paths
export GOPATH=$HOME/go
export PATH=/usr/local/go/bin:$GOPATH/bin:$PATH
```

### Build Geth and Swarm
```
$ git clone https://github.com/ethereum/go-ethereum.git
$ cd go-ethereum
$ git checkout v$LATEST_STABLE_RELEASE
$ make geth
$ make swarm
$ sudo cp build/bin/geth /usr/local/bin/geth
$ sudo cp build/bin/swarm /usr/local/bin/swarm
```
