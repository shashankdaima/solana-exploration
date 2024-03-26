// RUN THIS WITH npx esrun src/2-reading-and-writing-to-network/2-using-custom-onchain-program.ts
import * as web3 from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
const programId = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const pingProgramDataId =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')
const main = async () => {
    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: pingProgramDataId,
          isSigner: false,
          isWritable: true
        },
      ],
      programId
    })
    
    const transaction = new web3.Transaction()
    transaction.add(instruction)

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer],
    );
    console.log(`✅ You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}
main();