//Connecting to xrpLedger

// async function getXRPL() {
//   const api = new xrpl.Client("wss://xrplcluster.com");

//   // const api = new xrpl.Client("wss://s.altnet.rippletest.net/")

//   // console.log(api)

//   await api.connect();

//   let response = await api.request({
//     command: "ledger",
//     ledger_index: "validated",
//     transactions: true,
//   });

//   console.log();

//   let transaction_id = response.result.ledger.transactions[0];

//   let transaction_response = await api.request({
//     "command": "tx",
//     "transaction": transaction_id
//   });

//   console.log(transaction_response);
// }
// getXRPL();

// async function createWallet(){

//.net:portNumber
//   const api = new xrpl.Client("wss://s.altnet.rippletest.net:51233")

//   await api.connect()

//   const wallet = xrpl.Wallet.generate()

//   console.log(wallet)

//   api.disconnect()

// }

// createWallet()

// async function fundWallet(){

//   //.net:portNumber
//   const api = new xrpl.Client("wss://s.altnet.rippletest.net")

//   await api.connect()

//   const wallet = await api.fundWallet()

//   console.log(wallet.balance)

//   api.disconnect()

// }

// fundWallet()

async function sendXRP() {
  //.net:portNumber
  const api = new xrpl.Client("wss://s.altnet.rippletest.net");

  await api.connect();

  const walletObject = await api.fundWallet();
  const walletObject2 = await api.fundWallet();

  const wallet = walletObject.wallet;

  const preparedTransaction = await api.autofill({
    TransactionType: "Payment",
    Account: wallet.classicAddress,
    Amount: xrpl.xrpToDrops("1"),
    Destination: walletObject2.wallet.classicAddress,
  });

  console.log(preparedTransaction);

  const signed = wallet.sign(preparedTransaction)

  const results = await api.submitAndWait(signed.tx_blob)

  console.log(results)

  console.log(signed)
  
  // console.log(walletObject2)

  // console.log(walletObject)

  api.disconnect();
}

sendXRP();
