// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Enaira.sol";

contract SmartMeter {
    // State Variables
    Enaira public enaira;
    mapping(address => uint256) public energyBalance;
    uint256 public constant ENERGY_PRICE_PERpKWH = 1 * 10 ** 18; //This implies that the 1 Enaira = 1kWh

    // Events
    event EnergyUnitsPurchased(address indexed user, uint256 energyPurchased);

    constructor(address _enaira) {
        enaira = Enaira(_enaira);
    }

    function purchaseEnergyUnits(uint256 _energyUnits) external {
        uint256 cost = _energyUnits * ENERGY_PRICE_PERpKWH;
        require(
            enaira.balanceOf(msg.sender) > 0,
            "Insufficient Enaira Balance"
        );
        require(
            enaira.transferFrom(msg.sender, address(this), cost),
            "Approve transfer of Tokens to this contract"
        );
        energyBalance[msg.sender] += _energyUnits;

        emit EnergyUnitsPurchased(msg.sender, _energyUnits);
    }

    function checkEnergyBalance() public view returns (uint256) {
        return energyBalance[msg.sender];
    }
}
