/* eslint-disable @typescript-eslint/no-explicit-any,node/no-extraneous-import */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { Contract } from 'web3-eth-contract';

// Define your JSON metadata and address.
import ERC20Upgradeable from '@config/ERC20Upgradeable.json';
const exampleAddress = '0xEDA0A92877c9607b5B75eE2bE012B4bCe2599C81';

// Register your contract and address.
const targetMetadata = ERC20Upgradeable;
const targetAddress = exampleAddress;
// Call the method.
const getTargetTx = (targetContract: Contract) => {
  return targetContract.methods.approve(
    '0x382e12E4AD5C360E57BdD937a55B27c8AA15731B',
    '1'
  );
};

export const send = async (args: any) => {
  const web3 = new Web3(args.rpcUrl);
  const kit = newKitFromWeb3(web3 as any);
  kit.connection.addAccount(args.privateKey);
  kit.defaultAccount = await kit.connection
    .getAccounts()
    .then((accounts) => accounts[0]);
  const multisig = await kit.contracts.getMultiSig(args.safeAddress);

  const owners = await multisig.getOwners();
  owners.forEach((owner, index) => console.log(`Owner ${index}: ${owner}`));

  const contract = new kit.connection.web3.eth.Contract(
    targetMetadata.abi as any,
    targetAddress
  );

  const tx = await multisig.submitOrConfirmTransaction(
    targetAddress,
    await getTargetTx(contract),
    '0'
  );

  const pendingTx = await tx.send();
  console.log(`Tx: ${await pendingTx.getHash()}`);
  await pendingTx.waitReceipt();
  console.log(`Received receipt`);
};

yargs(hideBin(process.argv))
  .scriptName('multisig-tx')
  .version('1.0.0')
  .usage('$0 command [args]')
  .option('config', {
    type: 'string',
    describe: 'path to configuration file',
  })
  .command(
    'send',
    'Send the transaction to multisig',
    (yargs) => {
      yargs.option('rpc-url', {
        type: 'string',
        required: true,
        describe: 'RPC provider URL',
      });
      yargs.option('private-key', {
        type: 'string',
        required: true,
        describe: 'private key of the user wallet',
      });
      yargs.option('safe-address', {
        type: 'string',
        required: true,
        describe: 'address of the multisig wallet',
      });
    },
    send
  )
  .help()
  .parseAsync()
  .then();
