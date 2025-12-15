import {ethers, getDefaultProvider, Wallet} from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({path : "./.env"});

const WALLET_FILE = 'wallets.json';
const ETH_TO_SEND = 0.1;
const USDC_TO_SEND = 10000; // 0.01 usdc(6 decimals)
const USDC_ADDR = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // needs to be a string
// const ERC20ABI = require("./ERC20ABI.json");
import ERC20ABI from './ERC20ABI.json' assert {type: "json"};
const TRANSFER_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

async function fundETH(){
    const provider = getDefaultProvider("sepolia", {
        alchemy : process.env.ALCHEMY_API_KEY
    });
    // console.log("provider : ", provider);

    if(!process.env.FUNDER_PRIVATE_KEY){
        throw new Error("Funder private key not found");
    }
    const funderKey = process.env.FUNDER_PRIVATE_KEY;
    const funder = new Wallet(funderKey, provider);

    let walletsToFund;
    try {
        walletsToFund = JSON.parse(fs.readFileSync(WALLET_FILE, 'utf-8'));
    } catch (err) {
        console.error(`Error reading ${WALLET_FILE}.`);
        console.error('Please run `node utils/generate-wallets.js` first.');
        return;
    }

    // console.log("Wallets to fund ", walletsToFund);
    // console.log(ethers.parseEther(ETH_TO_SEND.toString()));
    
    for (const wallet of walletsToFund){
        // console.log("Wallet : ", wallet.wallet);
        const address = wallet.wallet.address;
        const pubKey = wallet.publicKey;
        try{
            console.log("Funding wallet : ", address);
            // console.log("pubKey : ", pubKey);
            const tx = await funder.sendTransaction({
                to : address,
                value : ethers.parseEther(ETH_TO_SEND.toString())
            });

            console.log("Transaction sent : ", tx);
            const receipt = await tx.wait();
            console.log("Receipt : ", receipt);

        } catch(e){
            console.log("Wallet funding failed with error : ", e);
        }
    }
}

async function fundUSDC(){
    const provider = getDefaultProvider("sepolia", {
        alchemy : process.env.ALCHEMY_API_KEY
    });
    // console.log("provider : ", provider);

    if(!process.env.FUNDER_PRIVATE_KEY){
        throw new Error("Funder private key not found");
    }
    const funderKey = process.env.FUNDER_PRIVATE_KEY;
    const funder = new Wallet(funderKey, provider);

    let walletsToFund;
    try {
        walletsToFund = JSON.parse(fs.readFileSync(WALLET_FILE, 'utf-8'));
    } catch (err) {
        console.error(`Error reading ${WALLET_FILE}.`);
        console.error('Please run `node utils/generate-wallets.js` first.');
        return;
    }

    const USDC = new ethers.Contract(USDC_ADDR, ERC20ABI, provider);
    

    // const firstAddress = "0x051cF31e1f718987C43359C21De10a0944B9C116"; // must be a string
    // const tx = await USDC.connect(funder).transfer(firstAddress, USDC_TO_SEND);
    // console.log("Transaction : ", tx);
    // const receipt = await tx.wait();
    // console.log("Receipt : ", receipt);

    for (const wallet of walletsToFund){
        const address = wallet.wallet.address;
        try{
            // await USDC.connect(funder).transfer(address, USDC_TO_SEND);
            const tx = await USDC.connect(funder).transfer(address, USDC_TO_SEND);
            console.log("Transaction : ", tx);
        } catch(e){
            console.log("Error funding with USDC : ", e);
        }
    }
}

// fundETH();
fundUSDC();