import Web3 from 'web3'
import { createMsgHash, createSignedMsg } from '../util/msgOperations'

export class HermesJS {
  constructor(provider) {
    this.web3 = new Web3(provider)
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

    return signedMessage;
  }
}
