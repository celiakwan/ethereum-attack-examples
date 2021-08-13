const ReentrancyVictim = artifacts.require('ReentrancyVictim');
const ReentrancyAttacker = artifacts.require('ReentrancyAttacker');

const BN = n => new web3.utils.BN(n);

contract('Reentrancy', accounts => {
    let victim, attacker;
    const depositAmountAcct0 = web3.utils.toWei('5', 'ether');
    const depositAmountAcct1 = web3.utils.toWei('1', 'ether');

    before(async () => {
        victim = await ReentrancyVictim.deployed();
        attacker = await ReentrancyAttacker.deployed();

        await web3.eth.sendTransaction({
            from: accounts[0],
            to: victim.address,
            value: depositAmountAcct0
        });
    });

    it('Reentrancy', async () => {
        await attacker.deposit(victim.address, {
            from: accounts[1],
            value: depositAmountAcct1
        });

        const victimBalance = await web3.eth.getBalance(victim.address);
        const expectedVictimBalance = BN(depositAmountAcct0).add(BN(depositAmountAcct1));
        assert.equal(victimBalance, expectedVictimBalance, 'Incorrect ETH balance of the victim account');

        const attackerBalance = await web3.eth.getBalance(attacker.address);
        assert.equal(attackerBalance, 0, 'Incorrect ETH balance of the attacker account');
        
        await attacker.attack(victim.address, {from: accounts[1]});
        
        const victimBalanceAfter = await web3.eth.getBalance(victim.address);
        assert.equal(victimBalanceAfter, 0, 'Incorrect ETH balance of the victim account after attack');

        const attackerBalanceAfter = await web3.eth.getBalance(attacker.address);
        const expectedAttackerBalanceAfter = BN(depositAmountAcct0).add(BN(depositAmountAcct1));
        assert.equal(attackerBalanceAfter, expectedAttackerBalanceAfter, 'Incorrect ETH balance of the attacker account after attack');
    });
});
