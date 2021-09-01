# ethereum-attack-examples
Examples of attacks on Ethereum smart contracts such as reentrancy, integer overflow, integer underflow and DoS with revert.

### Version
- [Solidity](https://solidity.readthedocs.io/): 0.7.6
- [Truffle](https://www.trufflesuite.com/): 5.4.5
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli): 6.12.2
- [Web3.js](https://web3js.readthedocs.io/): 1.5.1
- [Node.js](https://nodejs.org/en/): 16.6.1

### Installation
Install Node.js.
```
brew install node
```

Install Truffle globally.
```
npm install truffle -g
```

Install Ganache CLI globally.
```
npm install ganache-cli -g
```

### Configuration
By default, Ganache will create 10 accounts and preload each with 100 ETH on your local blockchain network. If you want to connect to other Ethereum networks, you will need to update the Truffle configuration file `truffle-config.js`.

### Deployment
1. Run a local testnet using Ganache.
    ```
    ganache-cli -p 7545
    ```

2. Compile the smart contracts.
    ```
    truffle compile
    ```

3. Deploy the smart contracts.
    ```
    truffle migrate
    ```

### Testing
Run test cases for reentrancy.
```
truffle test test/Reentrancy.js
```

Run test cases for integer overflow.
```
truffle test test/IntegerOverflow.js
```

Run test cases for integer underflow.
```
truffle test test/IntegerUnderflow.js
```

Run test cases for DoS with revert.
```
truffle test test/DosRevert.js
```