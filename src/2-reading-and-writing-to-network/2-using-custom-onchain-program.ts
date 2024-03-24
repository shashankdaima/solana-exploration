// RUN THIS WITH npx esrun src/2-reading-and-writing-to-network/2-using-custom-onchain-program.ts
import * as web3 from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

const main = async () => {
    const newBalance = await airdropIfRequired(
        connection,
        payer.publicKey,
        1 * web3.LAMPORTS_PER_SOL,
        0.5 * web3.LAMPORTS_PER_SOL,
    );
    
}
main();