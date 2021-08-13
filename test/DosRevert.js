const DosRevertVictim = artifacts.require('DosRevertVictim');
const DosRevertAttacker = artifacts.require('DosRevertAttacker');

const BN = n => new web3.utils.BN(n);

contract('DosRevert', accounts => {
    let victim, attacker;
    const bid1 = web3.utils.toWei('1', 'ether');
    const bid2 = web3.utils.toWei('2', 'ether');

    before(async () => {
        victim = await DosRevertVictim.deployed();
        attacker = await DosRevertAttacker.deployed();
    });

    it('DosRevert', async () => {
        await attacker.bid(victim.address, {
            from: accounts[0],
            value: bid1
        });

        const leader1 = await victim.getCurrentLeader();
        assert.equal(leader1, attacker.address, 'Incorrect leader of the first bid');

        let f;
        try {
            await victim.bid({
                from: accounts[1],
                value: bid2
            });
        } catch(e) {
            f = () => {throw e};
        } finally {
            assert.throws(f, /revert/, 'Cannot attack by DoS with revert');
        }
        
        const leader2 = await victim.getCurrentLeader();
        assert.equal(leader2, attacker.address, 'Incorrect leader of the second bid');
    });
});
