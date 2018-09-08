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
    version,
    to,
    from,
    value,
    data,
    extraHash,
    nonce = null,
    gasPrice = null,
    gasLimit = null,
    gasToken = null,
    operationType = null
  ) {
    let msgHash = createMsgHash(
      version,
      to,
      from,
      value,
      data,
      extraHash,
      nonce,
      gasPrice,
      gasLimit,
      gasToken,
      operationType
    );

    let signedMessage = createSignedMsg(this.web3, msgHash);

    let toSend = {
      safeAddress: this.safeAddress,
      signedMessage: signedMessage
    };
    await this.publisher.send(toSend);
  }
}
