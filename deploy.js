const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// import the interface and the bytecode from the compiled script.
const { interface , bytecode } = require('./compile');
// it will take two argument 
// the first is : is going to be our account mnemonic 
// mnemonic allows us to derive the public key and the private key. so we can get the total access to the account.
// the second is going to be the url to the network you want to connect to.
const provider = new HDwalletProvider(
'craft settle dream sausage celery top emerge anchor extra require mule give',
'https://rinkeby.infura.io/v3/9e854631d3e74c3e887d6b271296304b'
);
//this instance of web3 in completely enabled for rinkeby network . we have unlocked an account so we have a source of ether 
// and we have specified what network the web3 instance needs to connect 
// so we can use this instance to send ether or deploycontract and update it .what ever we want .
const web3 = new Web3(provider);


// the cause of this function is to give us the ability to use asnyc .
deploy = async ()=>{
    // first get a list of all the accounts .. and we will use the first account address .
    const accounts  = await web3.eth.getAccounts();
    console.log('attemping to deploy from account : ' , accounts[0]);
    //the abi comes into json but we need to pass it into javascript object
  const result =  await new web3.eth.Contract(JSON.parse(interface))
    // put the bytecode of the contract and the initail value of the contract .
    .deploy({data: '0x'+bytecode , arguments:['Hi There!']})
    .send({ from  :accounts[0]});
    // this is the address or the account that is used to deploy the contract .
    console.log("Contract deployed to :" , result.options.address);
}
deploy();