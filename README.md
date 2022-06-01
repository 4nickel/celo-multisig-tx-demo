## celo-multisig

> Demo of celo native multisig accounts.

### Installation
```sh
cd celo-multisig-demo
yarn install
yarn build
```

### Usage

#### send

Sends a transaction via multisig.

To use, edit`targetMetadata`, `targetAddress` and `getTargetTx` and run `yarn build`.

Then execute the transaction with:

```sh
yarn start send --rpc-url URL --private-key KEY --safe-address ADDR
```
