import express,{ Request,Response } from 'express';
import cors from 'cors';
import {generateMnemonic, mnemonicToSeedSync} from 'bip39';
import {derivePath} from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import {Keypair} from '@solana/web3.js';

const app=express();
app.use(express.json());

app.use(cors());

let Mnemonic:string;
let seed:Buffer;

app.get('/generateMnemonic',(req:Request,res:Response)=>{
    Mnemonic=generateMnemonic();
    const words=Mnemonic.split(' ')
    res.json({words});
});

app.get('/seed',(req:Request,res:Response)=>{
    seed=mnemonicToSeedSync(Mnemonic);
    res.json({seed})
})

app.get('/derivedseed',(req:Request,res:Response)=>{
    const accountNo=req.query.No;

    const path=`m/44'/60'/${accountNo}'/0'`;
    const derivedSeed=derivePath(path,seed.toString('hex')).key;
    const secret=nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const PrivateKey=secret.slice(0,32);
    const SentPrivate=Buffer.from(PrivateKey).toString('hex');
    const SentPublic=Keypair.fromSecretKey(secret).publicKey.toBase58();
    res.json({
        privateKey:SentPrivate,
        publicKey:SentPublic
    })
    
});


app.listen(3000,()=>{console.log('backend started');})