const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress , amount){
        this.fromAddress = fromAddress ;
        this.toAddress = toAddress ;
        this.amount = amount ;
    }


}



class Block{
    constructor( timestamp, transactions,previousHash = ''){
        this.timestamp = timestamp ; 
        this.data = transactions ;
        this.previousHash = previousHash ;
        this.hash = this.calculateHash();
        this.nonce = 0 ;
    }

    calculateHash(){
        return SHA256(this.index 
            + this.previousHash 
            + this.timestamp + this.nonce
            + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty +1 ).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        } 
        console.log("block mined " + this.hash);

    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()] ; 
        this.pendingTransactions = [];
        this.difficulty = 2 ;
        this.miningReward = 100 ;
    }
    createGenesisBlock(){
        return new Block("09/08/2024" , "Genesis block" , "0");
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1];
    }
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined !");

        this.chain.push(block);

        this.pendingTransactions= [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address){
        let balance = 0 ;

        for(const block of this.chain){
            for(const trans of this.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount ;
                }
                
                if(trans.toAddress === address){
                    balance -= trans.amount ;
                }
            }
        }
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1 ; i < this.chain.length ; i++ ){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1]; 

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        } 
        return true;  
    }
}
let savjeeCoin = new Blockchain();
console.log("Mining block 1...");
savjeeCoin.addBlock(new Block("10/08/2024", {amount : 4}));
console.log("Mining block 2...");

savjeeCoin.addBlock(new Block("11/08/2024", {amount : 20}));

//console.log(JSON.stringify(savjeeCoin, null , 4));
//console.log("Is blockchain valid ?" + savjeeCoin.isChainValid());

//savjeeCoin.chain[1].data = {amount : 100};

//console.log("Is blockchain valid ?" + savjeeCoin.isChainValid());
