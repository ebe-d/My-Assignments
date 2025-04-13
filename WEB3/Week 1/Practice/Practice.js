const crypto=require('crypto');

function Findhashwithaprefix(prefix){
    let input=0;
    while(true){
        let inputStr=`harkirat => Raman | Rs 100 Ram => Ankit | Rs 10 `+input.toString();
        let hash=crypto.createHash('sha256').update(inputStr).digest('hex');
        if(hash.startsWith(prefix)){
            return {input:inputStr,hash:hash}
        }
        input++;
    }
}

const result=Findhashwithaprefix('00000');
console.log(result.input);
console.log(result.hash);


