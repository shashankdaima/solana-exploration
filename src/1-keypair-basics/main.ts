// RUN COMMAND: npm start 1-keypair-basics/index.js
import "dotenv/config"
import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

console.log("1-keypair-basics");

//Solana uses public keys as addresses => This keypair thing is for address
const keypair = Keypair.generate();//Generate new keypair, not nessacerily a new account

//The public key is used as an “address” that points to an account on the Solana network. Even friendly names - like example.sol - point to addresses like dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8
// The secret key is used to verify authority over that keypair. If you have the secret key for an address, you control the tokens inside that address. For this reason, as the name suggests, you should always keep secret keys secret.


console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);

// Only thing we need rn is to have secret key in env file.
const keypairFromEnv = getKeypairFromEnvironment("SECRET_KEY");
console.log(`The public key is: `, keypairFromEnv.publicKey.toBase58());
console.log(`The secret key is: `, keypairFromEnv.secretKey);