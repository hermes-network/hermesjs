const Web3Utils = require('web3-utils')
const Shh = require('web3-shh')


export default class Publisher {
  constructor (web3) {
    this.shh = new Shh('ws://eth.oja.me:8547')
    this.appName = Web3Utils.asciiToHex("hermes-network").slice(0, 10)
    this.symKeyID = await shh.generateSymKeyFromPassword("hermes")
  }

  send (data) {
    const payload = Web3Utils.asciiToHex(data)

    // send a test message
    const message = {
      symKeyID: symKeyID,
      ttl: 100,
      topic: appName,
      powTarget: 2.0,
      powTime: 2,
      payload: payload
    }

    const result = await shh.post(message)
    console.log(result)
    return result
  }
}
