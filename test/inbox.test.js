const assert  = require('assert');
const ganache  = require('ganache-cli');
const Web3  = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // this is an instance of web3.
const {interface , bytecode } = require('../compile'); 

let accounts;
let inbox;

beforeEach(async ()=>{
    // get a list of all accounts 
   accounts =  await web3.eth.getAccounts();
    // gets resolve a list of accounts ..
    // use one of these account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // Capital C is indicate to the constructor .. this is a instance of a contract.
    .deploy({data: bytecode , argument:['Hi there']})
    .send({from:accounts[0]  , gas:"1000000"});
});
describe('Inbox Contract :', ()=>{
    it('deploys a contract :' , ()=>{
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });
    // first ,we have access to inbox instance that we defined before 
    it('can change the message :' , async ()=>{
        //set the message and send the transaction
        // add pass an object 
        // it is an ascynchronous , so we have to wait until be completed ..
      await inbox.methods.setMessage("bye").send({from:accounts[0] , gas:"1000000"});
      const message = await inbox.methods.message().call();
      assert.equal(message , "bye");
     
    });
}

);