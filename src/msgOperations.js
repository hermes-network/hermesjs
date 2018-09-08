import web3Utils from 'web3-utils';
import ethUtils from 'ethereumjs-util';
import abi from 'ethereumjs-abi';

export function createMsgHash(
  to,
  value,
  data,
  operation,
  safeTxGas,
  dataGas,
  gasPrice,
  gasToken,
  refundReceiver,
  nonce,
  SAFE_TX_TYPEHASH = 0x14d461bc7412367e924637b363c7bf29b8f47e2f84869f4426e5633d8af47b20
) {
  const dataHash = web3Utils.soliditySha3({
    t: 'bytes',
    v: data
  });

  console.log(data.length);
  console.log(dataHash);

  return abi.soliditySHA3(
    [
      'bytes32',
      'address',
      'uint256',
      'bytes',
      'uint',
      'uint256',
      'uint256',
      'uint256',
      'address',
      'uint256'
    ],
    [
      SAFE_TX_TYPEHASH,
      to,
      value,
      dataHash,
      operation,
      safeTxGas,
      gasPrice,
      gasToken,
      refundReceiver,
      nonce
    ]
  );
  // .substring(2);
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
