import web3Utils from 'web3-utils';
import ethUtils from 'ethereumjs-util';

export function createMsgHash(
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
  const dataHash = web3Utils.soliditySha3({
    t: 'bytes',
    v: data
  });

  console.log(data.length);
  const callPrefix = data.length > 4 ? data.substring(0, 4) : '0x00';

  console.log(dataHash);
  console.log(callPrefix);
  return web3Utils
    .soliditySha3(
      { t: 'bytes', v: '0x19' },
      { t: 'bytes', v: version },
      { t: 'address', v: from },
      { t: 'address', v: to },
      { t: 'uint256', v: value },
      { t: 'bytes32', v: dataHash },
      { t: 'uint256', v: nonce },
      { t: 'uint256', v: gasPrice },
      { t: 'uint256', v: gasLimit },
      { t: 'address', v: gasToken },
      { t: 'uint8', v: operationType },
      { t: 'bytes4', v: callPrefix },
      { t: 'bytes', v: extraHash }
    )
    .substring(2);
}

export function createSignedMsg(web3Provider, msgHash) {
  let messageSignature = '0x';
  // only one signature from the first account
  const sig = ethUtils.ecsign(
    Buffer.from(msgHash, 'hex'),
    Buffer.from(web3Provider.accounts[0], 'hex')
  );
  messageSignature += sig.r.toString('hex') + sig.s.toString('hex') + sig.v.toString(16);
  return messageSignature;
}
