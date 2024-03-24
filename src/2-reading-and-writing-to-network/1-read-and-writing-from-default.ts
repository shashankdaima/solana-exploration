// RUN THIS FILE BY `npx esrun src/2-reading-and-writing-to-network/main.js`

// - SOL is the name of Solana’s native token.Each SOL is made from 1 billion Lamports.
// - Accounts store tokens, NFTs, programs, and data.For now we’ll focus on accounts that store SOL.  
// - Addresses point to accounts on the Solana network.Anyone can read the data in a given address.Most addresses are also public keys.

//Keypair's Public key(shown as base-58 encoded strings ) points to the address of the account.

// Connecting to network
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import base58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`);

const readingFromRPC = async () => {

    // Wallet addresses to look up
    const addresses = ['FSddSvw4ursaNZ7UhBBAifGhCeNJY3H5FbxiUu26o5XK'];

    // Loop through each address
    for (const address of addresses) {
        try {
            const publicKey = new PublicKey(address);
            const balance = await connection.getBalance(publicKey);
            console.log(`The balance of the account at ${address} (${publicKey.toString()}) is ${balance / LAMPORTS_PER_SOL} SOL`);
        } catch (error: any) {
            console.error(`Error retrieving balance for address ${address}: ${error.message}`);
        }
    }

}
const writingToRPC = async () => {
    // To write to the blockchain(i.e. Any modification to onchain data) we need to sign the transaction.
    // A transaction on Solana is similar to a transaction elsewhere: it is atomic. Atomic means the entire transaction runs or fails.
    const fromAddress = getKeypairFromEnvironment("SECRET_KEY");
    const toAddress = new PublicKey("CKHZY75RPnBhNxrtBcxaB5m4RDefhJD78HC6HBL6VDZQ");

    console.log(
        `✅ Loaded our own keypair, the destination public key, and connected to Solana`
    );
    const transaction = new Transaction();
    const LAMPORTS_TO_SEND = 50;
    // console.log(fromAddress.publicKey.toString());
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: fromAddress.publicKey,
        toPubkey: toAddress,
        lamports: LAMPORTS_TO_SEND
    })

    transaction.add(sendSolInstruction)
    const signature =await  sendAndConfirmTransaction(
        connection,
        transaction,
        [fromAddress]
    )
    console.log(
        `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toAddress}. `
    );
    console.log(`Transaction signature is ${signature}!`);
    console.log(`✅ Finished!`);

}


readingFromRPC();
writingToRPC();

