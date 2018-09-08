const Web3 = require('web3');
const HermesJS = require('../');

describe('HermesJS full flows: ', function(accounts) {
    let hermesjs;
    let lastToSend;

    before(function () {
        let provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        hermesjs = new HermesJS(provider);
        hermesjs.initialize({
            send: function(toSend) {
                console.log('provider.send', toSend);
                lastToSend = toSend;
            }
        });
    })

    it('sign and execute a transaction', function () {
    });
})

