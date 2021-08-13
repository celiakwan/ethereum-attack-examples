const ReentrancyVictim = artifacts.require('ReentrancyVictim');
const ReentrancyAttacker = artifacts.require('ReentrancyAttacker');
const IntegerOverflow = artifacts.require('IntegerOverflow');
const IntegerUnderflow = artifacts.require('IntegerUnderflow');
const DosRevertVictim = artifacts.require('DosRevertVictim');
const DosRevertAttacker = artifacts.require('DosRevertAttacker');

module.exports = async (deployer) => {
  await deployer.deploy(ReentrancyVictim);
  await deployer.deploy(ReentrancyAttacker);
  await deployer.deploy(IntegerOverflow);
  await deployer.deploy(IntegerUnderflow);
  await deployer.deploy(DosRevertVictim);
  await deployer.deploy(DosRevertAttacker);
};
