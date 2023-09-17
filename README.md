
# 👾 Ethereum Private Network Faucet


<div id="header" align="center">
  <figure><img src="https://github.com/cheetah-alo/FaucetAppEthereum/assets/51385472/45416c68-5512-4d6e-98d7-6f5e0db36ffe" alt="" width="100"><figcaption></figcaption></figure>
</div>

<div id="badges" align="center">
  <a href="https://medium.com/@techieesp">
    <img src="https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white" alt="Medium Badge"/>
  </a>
  <a href="https://www.linkedin.com/in/jackybarraza/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://twitter.com/TechieESP_">
    <img src="https://img.shields.io/badge/twitter-black?style=for-the-badge&logo=X&logoColor=white" alt="twitter Badge"/>
  </a>

</div>


## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/).

This repository contains instructions and code for setting up a faucet for a private Ethereum network. The faucet allows users to request and receive Ether (ETH) for testing and development purposes.

### App Architecture

The architecture of the app is given by codecrypto.academy, see the scheme below:

<figure><img src=".gitbook/assets/Screenshot 2023-09-16 at 4.45.11 PM.png" alt=""><figcaption><p>App Architecture, source: cedecrypto.academy</p></figcaption></figure>

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

1. **Docker**: Install Docker to set up a local Ethereum node with the desired network configuration.
2. **Metamask**: Ensure you have Metamask installed in your browser and configure it to connect to the Ethereum private network.

## Steps

The following steps will guide you through the setup process:

***

### I. Ethereum Node

To interact with the Ethereum node, docker is utilized to run Ethereum client containers. The node's configuration is stored in the "node" directory. Inside the `node` folder, you need to create a `genesis.json` file with the content below.\
\
<mark style="color:orange;">**Note**</mark>: "alloc" is where you will give the address that want with balance, including the public address from the Ethereum node.

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

If we'd like to pre-fund some accounts for easier testing, create the accounts and populate the `alloc` field with their addresses.

```json
"alloc": {
  "0x0000000000000000000000000000000000000111": {
    "balance": "111111111"
  },
  "0x0000000000000000000000000000000000000222": {
    "balance": "222222222"
  }
}
```

***

### II. Docker

We will use Docker to create, initialize, and start the Ethereum node with the specified network configuration.

Execute the following docker sentences from the directory node that contain the genesis.json file.

#### **1. Create a New Ethereum Account**:

```bash
docker run --rm -it \
-v ${PWD}/data/keystore:/data \
ethereum/client-go:v1.11.5 account new \
--keystore data
```

After executing, provide a password. A new file will be generated in `..node/data/keystore`. <mark style="color:green;">**Ensure to change its format to**</mark> `.json`.\\

This command is used to run a Docker container for creating a new Ethereum account. Find below the meaning of each part of the sentence:

* `docker run` is the command to start a new container.
* `--rm` option ensures that the container is automatically removed after it exits.
* `-it` option allows you to run the container interactively (i.e., it attaches a terminal to the container).
* `-v ${PWD}/data/keystore:/data` maps the local directory `${PWD}/data/keystore` to `/data` inside the container. This ensures that any data written to `/data` inside the container is saved to `${PWD}/data/keystore` on the host.
* `ethereum/client-go:v1.11.5` is the name and version of the Docker image to run. In this case, it's the Ethereum Go client version 1.11.5.
* `account new` is a command to create a new Ethereum account.
* `--keystore data` specifies the directory inside the container where the keystore files for the new account will be saved.
* Since `/data` inside the container is mapped to `${PWD}/data/keystore` on the host, the keystore files will be saved there on the host.

#### **2. Initialize Ethereum Node with the file genesis.json**:

```bash
docker run --rm -it \
-v ${PWD}/data:/data \
-v ${PWD}/genesis.json:/genesis.json \
ethereum/client-go:v1.11.5 init \
--datadir data /genesis.json
```

\
<mark style="color:orange;">**Note**</mark>: Post-execution, verify the creation of a new folder at `..node/data/geth, this information is a representation of the Ethereum database.`

This command is used to initialized a docker container for creating a new Ethereum account. Find below the meaning of each part of the sentence:

* `init` - This is the command passed to the Ethereum Go client to initialize a new Ethereum node.
* `--datadir data` - This tells the Ethereum Go client to use the '/data' directory inside the container as the data directory.
* `/genesis.json` - This is the path to the genesis file inside the container, which provides the initial configuration for the Ethereum node.

#### **3. Start Ethereum Node**:

```bash
docker run -d -p 8545:8545 -p 33303:33303 \
--name private-eth-node-8888 \
-v ${PWD}/data:/data \
ethereum/client-go:v1.11.5 \
--datadir data \
--http --http.api "personal,eth,net,web3,rpc" \
--http.addr 0.0.0.0 --http.port 8545 \
--http.corsdomain="\*"
--miner.etherbase 0x000000000000000000000000000000000 \
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
* `--mine` - This starts the Ethereum node in mining mode.
* `--miner.etherbase 0x000000000000000000000000000000000` - This sets the Ethereum address that will receive mining rewards. Replace this with your desired address.
* `--miner.threads 1` - Specifies that the Ethereum node should use one thread for mining.

**Note**: After starting the container, it's important to verify the chain ID and ensure that the Proof of Work (PoW) version of Ethereum is running. You can do this by inspecting the container logs.

<figure><img src=".gitbook/assets/Screenshot 2023-09-16 at 6.14.48 PM.png" alt=""><figcaption></figcaption></figure>

***

### II. Configure Metamask

Configure Metamask to connect to the Ethereum private network. Follow these steps:

* Open Metamask.
* Click on the network selection dropdown (usually showing "Mainnet").
* Choose "Add a network manually" and enter the network details:
  * Network Name: 'Give a name to your network'
  * RPC URL: [http://localhost:8545](http://localhost:8545/) (assuming your Docker setup is using port 8545)
  * Chain ID: 8888
  * Currency Simbol: 'provide the your own currency simbole'
* Click "Save" to connect to the private network.

<figure><img src=".gitbook/assets/adding_the_info_to_Metamask.png" alt=""><figcaption></figcaption></figure>

Then you will be on your metamask the red with the balance given.\
\\

<figure><img src=".gitbook/assets/Screenshot 2023-09-16 at 6.20.13 PM.png" alt=""><figcaption></figcaption></figure>

***

### **Reference for Variables**:

To be able to execute the app, we nne to add the correct value to the variables found on the file ./config/constants.js

* PORT: app server port listen
* ADDRESS\_WALLET\_JSON: addresse create for the Ethereum account lacated in the "../node/data/keystore/UTC--2023.."
* DEFAULT\_ACCOUNT: address from my test metamask account
* KEYSTOREPATH: Load and decrypt an Ethereum account using a keystore file and password

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
3. Install dependencies npm install cors express web3
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
3. Install dependencies: `npm install react react-dom`.
4. Start the development server: `npm run dev`.
5. Open a browser and ensure MetaMask is connected to the appropriate network.

If there is any comments to improve and help other to learn, let me know.

Thanks and Happy Codding

JB
