
# 🧱 Issues with the Faucet App Implementation

I am facing several challenges when developing an application for an Ethereum faucet. Below, I detail the problems I have encountered, hoping to get some guidance or solution:\\

### 1. Issue Initializing the Node

When trying to initialize the node, I get the following error: `zsh:command not found`. This error occurs specifically when I try to use the `--mine` command. I have searched for solutions online, but I haven't found anything specifically related to this command. Error image:

**Error Imagen:**

<figure><img src="../.gitbook/assets/Screenshot 2023-08-20 at 12.36.55 AM.png" alt=""><figcaption></figcaption></figure>

When I check the node log, I have the PoW consensus mechanism and the specified chain id.\\

<figure><img src="../.gitbook/assets/Screenshot 2023-08-20 at 12.34.04 AM.png" alt=""><figcaption></figcaption></figure>

### 2. MetaMask Balance

Even though I've added the network to MetaMask, the balance doesn't show up. However, when running `npx nodemon` in the terminal, I can see a wallet balance. Could this be related to the node not starting up correctly?

Wallet

![](<../.gitbook/assets/Screenshot 2023-08-20 at 12.32.55 AM.png>)

On the Terminal

<figure><img src="../.gitbook/assets/Screenshot 2023-08-21 at 8.37.38 PM.png" alt=""><figcaption></figcaption></figure>

### 3. Issues with the Balance Displayed on the Frontend

On the frontend, the application detects and responds when I connect to MetaMask and also reflects changes when I switch accounts. However, the balance always displays as zero. Could it be that the actual balance is a decimal (like 0.5 ETH) and that's why it's not showing up?

<figure><img src="../.gitbook/assets/Screenshot 2023-08-20 at 12.33.49 AM.png" alt=""><figcaption></figcaption></figure>
