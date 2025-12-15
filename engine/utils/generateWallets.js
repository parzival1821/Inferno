import {ethers, getDefaultProvider, Wallet} from 'ethers';
import fs from 'fs';
// import crypto from 'crypto';

// var id = crypto.randomBytes(32).toString('hex');
// var privateKey = "0x"+id;
// console.log("Generated private key : ", privateKey);

// var wallet = ethers.Wallet(privateKey);
// console.log("Wallet address : ", wallet.address);

// console.log(ethers.providers.getNetwork("homestead"));
// console.log(ethers.getNetwork(1));
const provider = getDefaultProvider("sepolia");
console.log("provider : ", provider);

// const wallet = Wallet.createRandom(provider);
// console.log("wallet : ", wallet);

const WALLET_POOL_SIZE = 10;
const WALLET_FILE = 'wallets.json';

function generateWallets(){
    console.log(`Generating ${WALLET_POOL_SIZE} wallets..`);
    const wallets = [];
    for(let i=0;i<WALLET_POOL_SIZE;i++){
        const wallet = Wallet.createRandom(provider);
        wallets.push({
            wallet
        });
    }

    fs.writeFileSync(WALLET_FILE, JSON.stringify(wallets));
}

generateWallets();