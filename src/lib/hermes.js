// import dependencies
import web3 from 'web3';
import { createMsgHash, createSignedMsg } from '../util/msgOperations';

// return hermesjs class
export class HermesJS {
  constructor() {
    this.web3Provider = web3;
    this.initialized = true;
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

    let signedMessage = createSignedMsg(this.web3Provider, msgHash);

    return signedMessage;
  }
}
