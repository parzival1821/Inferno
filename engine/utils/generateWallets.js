import {ethers, getDefaultProvider, Wallet} from 'ethers';
import fs from 'fs';
const provider = getDefaultProvider("sepolia");
console.log("provider : ", provider);

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