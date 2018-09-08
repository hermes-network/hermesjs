import Web3 from 'web3';

import Publisher from './publisher';
import { createMsgHash, createSignedMsg } from './msgOperations';

export class HermesJS {
  constructor(provider) {
    this.web3 = new Web3(provider);
    this.initialized = true;
  }

  async initialize() {
    this.publisher = await Publisher.create();
  }

  static async create() {
    const o = new HermesJS();
    await o.initialize();
    return o;
  }

  setSafeAddress(_safeAddress) {
    this.safeAddress = _safeAddress;
  }

  async sendMessage(
    to,
    value,
    data,
    operation = 0,
    safeTxGas = 0,
    dataGas = 0,
    gasPrice = 0,
    gasToken = 0,
    refundReceiver = 0x0000000000000000000000000000000000000000,
    nonce = 0
  ) {
    let msgHash = createMsgHash(
      to,
      value,
      data,
      operation,
      safeTxGas,
      dataGas,
      gasPrice,
      gasToken,
      refundReceiver,
      nonce
    );

    let signedMessage = createSignedMsg(this.web3, msgHash);

    let toSend = {
      SAFE_TX_TYPEHASH: SAFE_TX_TYPEHASH,
      to: to,
      value: value,
      data: data,
      operation: operation,
      safeTxGas: safeTxGas,
      gasPrice: gasPrice,
      gasToken: gasToken,
      refundReceiver: refundReceiver,
      nonce: nonce,
      safeAddress: this.safeAddress,
      signedMessage: signedMessage
    };
    await this.publisher.send(toSend);
  }
}
