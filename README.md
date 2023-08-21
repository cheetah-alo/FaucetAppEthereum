
# Ethereum Faucet App

## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/). The application is a combination of a frontend and backend that interacts with an Ethereum node (PoW). The backend provides an API to fetch the balance of an Ethereum account and to send Ether from a faucet to a specified address. The frontend allows users to view their Ethereum address, balance, and request Ether from the faucet.

### App Architecture

</br>

![App-architecture](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/b30ffcc0-fb01-4665-94eb-c03ea41af3fd)
source: taken from course materia codecripto

**Reference Variables**:
- `$WalletAddresJson`: Address created in `./node/data/keystore/UTC--2023-...`
- `$WalletAddressMetamak`: Any account from your MetaMask to interact with the app.

## Ethereum Node

To interact with the Ethereum node, Docker is utilized to run Ethereum client containers. The node's configuration is stored in the "node" directory.

**Note**: Inside the `node` folder, you need to create a `genesis.json` file with the following content:

```json
{
  "config": {
    "chainId": 8888,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "ethash": {}
  },
  "difficulty": "1",
  "gasLimit": "12000000",
  "alloc": {
    "0x000000000000000000000000000000000": {
      "balance": "1000000000000000000000000000"
    }
  }
}
```

The address on alloc must be updated when you get the public addres from the ethereum node. 

### Docker Commands:

The docker sentence below can be found on the repo at `./back/docker commands`

1. **Create a New Ethereum Account**:
    ```bash
    docker run --rm -it \
    -v ${PWD}/data/keystore:/data \
    ethereum/client-go:v1.11.5 account new \
    --keystore data
    ```

    After executing, provide a password. A new file will be generated in `..node/data/keystore`. Ensure to change its format to `.json`.

2. **Initialize Ethereum Node with Genesis Block**:
    ```bash
    docker run --rm -it \
    -v ${PWD}/data:/data \
    -v ${PWD}/genesis.json:/genesis.json \
    ethereum/client-go:v1.11.5 init \
    --datadir data /genesis.json
    ```

    Post-execution, verify the creation of a new folder at `..node/data/geth`.

3. **Start Ethereum Node**:
    ```bash
    docker run -d -p 8545:8545 -p 33303:33303 \
    --name private-eth-node \
    -v ${PWD}/data:/data \
    ethereum/client-go:v1.11.5 \
    ...
    ```

    After starting the container, check the container logs to verify the chain id and ensure the PoW version is running.

    To connect with this network on MetaMask, follow the steps shown in the image below:

</br>


![adding_the_info_to_Metamask](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/e6a0f31a-6782-4119-9ba3-38ca8bb682c9)

</br>

## Backend

The backend is developed using Express.js and communicates with an Ethereum node via the Web3.js library.

### Key Features:

- **Web3 Initialization**: Connects to a local Ethereum node.
- **Express Setup**: Sets up an Express application with CORS middleware.
- **API Endpoints**: 
  - **GET /balance/:address**: Fetches the balance of a given Ethereum address.
  - **GET /faucet/:address**: Sends Ether from the faucet to the specified address.

### How to Run:

Make sure to fill the variables with the right information. 

1. Ensure Node.js and npm are installed.
2. Navigate to the backend directory.
3. Install dependencies: `npm install`.
4. To check the app: `npx nodemon app.js`.


</br>

## Frontend

The frontend is crafted using React and communicates with the Ethereum blockchain via the MetaMask browser extension.

### Key Features:

- **State Management**: Utilizes React's useState and useEffect hooks.
- **Ethereum Interaction**: Uses the global `window.ethereum` object from MetaMask.
- **UI Components**: Displays Ethereum address, balance, and a faucet button.

### How to Run:

1. Ensure Node.js, npm, and MetaMask are installed.
2. Navigate to the frontend directory.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Open a browser and ensure MetaMask is connected to the appropriate network.

</br>
</br>

If there is any commenst to improve and help other to learn, let me know. 

Thanks :D 

</br>



