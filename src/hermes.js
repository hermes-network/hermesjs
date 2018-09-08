import Web3 from 'web3'

import Publisher from './publisher'
import { createMsgHash, createSignedMsg } from '../util/msgOperations'

export class HermesJS {
  constructor(provider) {
    this.web3 = new Web3(provider)
    this.publisher = new Publisher(this.web3)
    this.initialized = true
  }

  sendMessage(
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
    // this.publisher.send(signedMessage);

    return signedMessage;
  }
}
