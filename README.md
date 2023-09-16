---
description: Repo description and settings
cover: >-
  https://images.unsplash.com/photo-1556010334-298f19160723?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw0fHxmYXVjZXR8ZW58MHx8fHwxNjkyNjQxNTIwfDA&ixlib=rb-4.0.3&q=85
coverY: 48
---

# Ethereum Faucet App

<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
</div>


## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/). The application is a combination of a **frontend** and **backend** that interacts with an **Ethereum node (PoW)**. \\

The backend provides an API to fetch the balance of an Ethereum account and to send Ether from a faucet to a specified address

* The frontend allows users to view their Ethereum address, balance, and request Ether from the faucet.

{% hint style="info" %}
There are some points that I haven´t been able to haddle it. Those points are decribed at `reports/IssuesToShoot.md`
{% endhint %}

### App Architecture

![App-architecture](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/9c8fb771-9ef9-46d5-978c-4cc567fcbf3c)

source: taken from course materia codecripto

**Reference for Variables**:

* `$WalletAddresJson`: Address created in `./node/data/keystore/UTC--2023-...`
* `$WalletAddressMetamak`: Any account from your MetaMask to interact with the app.

***

## Ethereum Node

To interact with the Ethereum node, Docker is utilized to run Ethereum client containers. The node's configuration is stored in the "node" directory.

{% hint style="info" %}
**Note**: Inside the `node` folder, you need to create a `genesis.json` file with the content below
{% endhint %}

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

{% hint style="info" %}
The address on alloc must be updated when you get the public address from the ethereum node.
{% endhint %}

***

### Docker Commands:

The docker sentence below can be found on the repo at `./back/docker commands`

#### **1. Create a New Ethereum Account**:

```bash
docker run --rm -it \
-v ${PWD}/data/keystore:/data \
ethereum/client-go:v1.11.5 account new \
--keystore data
```

After executing, provide a password. A new file will be generated in `..node/data/keystore`. Ensure to change its format to `.json`.\\

This command is used to run a Docker container for creating a new Ethereum account. Find below the meaning of each part of the sentence:

* `docker run` is the command to start a new container.
* `--rm` option ensures that the container is automatically removed after it exits.
* `-it` option allows you to run the container interactively (i.e., it attaches a terminal to the container).
* `-v ${PWD}/data/keystore:/data` maps the local directory `${PWD}/data/keystore` to `/data` inside the container. This ensures that any data written to `/data` inside the container is saved to `${PWD}/data/keystore` on the host.
* `ethereum/client-go:v1.11.5` is the name and version of the Docker image to run. In this case, it's the Ethereum Go client version 1.11.5.
* `account new` is a command to create a new Ethereum account.
* `--keystore data` specifies the directory inside the container where the keystore files for the new account will be saved.
* Since `/data` inside the container is mapped to `${PWD}/data/keystore` on the host, the keystore files will be saved there on the host.

#### **2. Initialize Ethereum Node with the genesis.json**:

```bash
docker run --rm -it \
-v ${PWD}/data:/data \
-v ${PWD}/genesis.json:/genesis.json \
ethereum/client-go:v1.11.5 init \
--datadir data /genesis.json
```

\
Post-execution, verify the creation of a new folder at `..node/data/geth`

This command is used to initialized a docker container for creating a new Ethereum account. Find below the meaning of each part of the sentence:

* `init` - This is the command passed to the Ethereum Go client to initialize a new Ethereum node.
* `--datadir data` - This tells the Ethereum Go client to use the '/data' directory inside the container as the data directory.
* `/genesis.json` - This is the path to the genesis file inside the container, which provides the initial configuration for the Ethereum node.

#### **3. Start Ethereum Node**:

```bash
docker run -d -p 8545:8545 -p 33333:33333 \
--name private-eth-node2 \
-v ${PWD}/data:/data \
ethereum/client-go:v1.11.5 \
--datadir data \
--http \
--http --http.api "personal,eth,net,web3,rpc" \
--http.addr 0.0.0.0 --http.port 8545 \
--http.corsdomain="\*"
--mine --miner.etherbase 0x000000000000000000000000000000000 \
--miner.threads 1
```

This command runs a docker container for a private Ethereum node.

* `docker run` - This command is used to start a new Docker container.
* `-d` - This flag runs the container in detached mode, meaning it runs in the background.
* `-p 8545:8545 -p 33303:33303` - These flags map the ports from the host to the container. The Ethereum node inside the container will be accessible on port 8545 and 33303 of the host machine.
* `--name private-eth-node` - This assigns a name to the container, making it easier to manage and reference.
* `-v ${PWD}/data:/data` - This mounts the 'data' directory from the current host directory (`${PWD}`) to the '/data' directory inside the container. This ensures that the Ethereum node data is persisted on the host machine.
* `ethereum/client-go:v1.11.5` - Specifies the Docker image to be used, which is the Ethereum Go client version 1.11.5.
* `--datadir data` - This tells the Ethereum Go client to use the '/data' directory inside the container as the data directory.
* `--http` - Enables the HTTP-RPC server.
* `--http --http.api "personal,eth,net,web3,rpc"` - Specifies the APIs that should be available over HTTP. In this case, it's personal, eth, net, web3, and rpc.
* `--http.addr 0.0.0.0 --http.port 8545` - This sets the address and port for the HTTP-RPC server. It will listen on all available network interfaces (`0.0.0.0`) and port 8545.
* `--http.corsdomain="*"` - This allows any domain to access the HTTP-RPC server, which can be useful for development purposes but might be a security risk in production.
* `--mine` - This starts the Ethereum node in mining mode.&#x20;
* `--miner.etherbase 0x000000000000000000000000000000000` - This sets the Ethereum address that will receive mining rewards. Replace this with your desired address.
* `--miner.threads 1` - Specifies that the Ethereum node should use one thread for mining.

{% hint style="info" %}
After starting the container, check the container logs to verify the chain id and ensure the PoW version is running.\\
{% endhint %}

***

### Connect the created network with Metamask

To connect with this network on MetaMask, follow the steps shown in the image below:

![adding\_the\_info\_to\_Metamask](https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/e1f5f063-6d45-4fd6-8300-79bf86df8170)

***

## Backend

The backend is developed using `Express.js` and communicates with an Ethereum node via the `Web3.js` library.

### Key Features:

* **Web3 Initialization**: Connects to a local Ethereum node.
* **Express Setup**: Sets up an Express application with CORS middleware.
* **API Endpoints**:
  * **GET /balance/:address**: Fetches the balance of a given Ethereum address.
  * **GET /faucet/:address**: Sends Ether from the faucet to the specified address.

### How to Run:

Make sure to fill the variables with the right information.

1. Ensure Node.js and npm are installed.
2. Navigate to the backend directory.
3. Install dependencies: `yarn install`.
4. To check the app: `npx nodemon app.js`.

***

## Frontend

The frontend is crafted using React and communicates with the Ethereum blockchain via the MetaMask browser extension.

### Key Features:

* **State Management**: Utilizes React's useState and useEffect hooks.
* **Ethereum Interaction**: Uses the global `window.ethereum` object from MetaMask.
* **UI Components**: Displays Ethereum address, balance, and a faucet button.

### How to Run:

1. Ensure Node.js, npm, and MetaMask are installed.
2. Navigate to the frontend directory.
3. Install dependencies: `yarn install`.
4. Start the development server: `npm run dev`.
5. Open a browser and ensure MetaMask is connected to the appropriate network.

If there is any comments to improve and help other to learn, let me know.

Thanks and Happy Codding

JB
