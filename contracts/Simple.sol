//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

contract Getter {
    uint256  value=0;

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
