docker run --rm -it -v ${PWD}/data/keystore:/data ethereum/client-go:v1.11.5 account new --keystore data
echo "GET the address from the previous command"
docker run --rm -it -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json  ethereum/client-go:v1.11.5 init --datadir data genesis.json
docker run -d -p 8545:8545 -p 33303:33303 --name private-eth-node -v ${PWD}/data:/data ethereum/client-go:v1.11.5 --datadir data \         
--http --http.api "personal,eth,net,web3,rpc" --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain="\*" --mine --miner.etherbase 0xa54b2743d01a737C19dBe0dC676c5f356fF4eDF5 \
--miner.threads 1