const IntegerOverflow = artifacts.require('IntegerOverflow');

const BN = n => new web3.utils.BN(n);

contract('IntegerOverflow', accounts => {
    let victim;
    const attacker = accounts[0];
    const payee = accounts[1];

    before(async () => {
        victim = await IntegerOverflow.deployed();
    });

    it('IntegerOverflow', async () => {
        const attackerBalance = await victim.getBalance(attacker);
        assert.equal(attackerBalance, 0, 'Incorrect ETH balance of the attacker account');

        const payeeBalance = await victim.getBalance(payee);
        assert.equal(payeeBalance, 0, 'Incorrect ETH balance of the payee account');

        const cost = BN(2).pow(BN(256)).sub(BN(1));
        await victim.pay(cost, 1, payee, {from: attacker});

        const attackerBalanceAfter = await victim.getBalance(attacker);
        assert.equal(attackerBalanceAfter, 0, 'Incorrect ETH balance of the attacker account after attack');

        const payeeBalanceAfter = await victim.getBalance(payee);
        assert.equal(payeeBalanceAfter, 0, 'Incorrect ETH balance of the payee account after attack');
    });
});
