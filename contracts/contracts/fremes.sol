// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Fremeswtf {
    address public protocolFeeDestination;
    address public communityFeeDestination;

    uint256 public protocolFeePercent; // 35000000000000000 = 3.5% (15 zeros following the 35)
    uint256 public subjectFeePercent; // 35000000000000000 = 3.5% (15 zeros following the 35)
    uint256 public communityFeePercent; // 20000000000000000 = 2.0% (16 zeros following the 2)
    uint256 public benefactorFeePercent; // 5000000000000000 = 0.5% (15 zeros following the 5) upto 2 benefactors

    uint256 public constant benefactorLimit = 2;

    event Trade(
        address trader,
        address subject,
        string ticker,
        bool isBuy,
        uint256 fremeAmount,
        uint256 ethAmount,
        uint256 protocolEthAmount,
        uint256 subjectEthAmount,
        uint256 communityEthAmount,
        uint256 benefactorEthAmount,
        uint256 supply
    );

    // creatorAddress => (ticker => ( holderAddress => balance)))
    mapping(address => mapping(string => mapping(address => uint256)))
        public fremesBalance;

    // creatorAddress => (ticker => supply))
    mapping(address => mapping(string => uint256)) public fremesSupply;

    // creatorAddress => (ticker => (benefactorIndex => benefactorAddress))
    mapping(address => mapping(string => mapping(uint256 => address)))
        public benefactors;

    address private _owner;

    constructor() {
        _owner = msg.sender;
        protocolFeeDestination = msg.sender;
        communityFeeDestination = msg.sender;
        protocolFeePercent = 35000000000000000;
        subjectFeePercent = 35000000000000000;
        communityFeePercent = 20000000000000000;
        benefactorFeePercent = 5000000000000000;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "caller is not the owner");
        _;
    }

    function setProtocolFeeDestination(
        address _feeDestination
    ) public onlyOwner {
        protocolFeeDestination = _feeDestination;
    }

    function setCommunityFeeDestination(
        address _feeDestination
    ) public onlyOwner {
        communityFeeDestination = _feeDestination;
    }

    function setProtocolFeePercent(uint256 _feePercent) public onlyOwner {
        // Cannot be more than 5 percent
        require(
            _feePercent <= 50000000000000000,
            "Fee percent must be less than 5%"
        );
        protocolFeePercent = _feePercent;
    }

    function setSubjectFeePercent(uint256 _feePercent) public onlyOwner {
        // Cannot be more than 5 percent
        require(
            _feePercent <= 50000000000000000,
            "Fee percent must be less than 5%"
        );
        subjectFeePercent = _feePercent;
    }

    function setCommunityFeePercent(uint256 _feePercent) public onlyOwner {
        // Cannot be more than 3 percent
        require(
            _feePercent <= 30000000000000000,
            "Fee percent must be less than 3%"
        );
        communityFeePercent = _feePercent;
    }

    function setBenefactorFeePercent(uint256 _feePercent) public onlyOwner {
        // Cannot be more than 2 percent
        require(
            _feePercent <= 20000000000000000,
            "Fee percent must be less than 2%"
        );
        benefactorFeePercent = _feePercent;
    }

    function getPrice(
        uint256 supply,
        uint256 amount
    ) public pure returns (uint256) {
        uint256 sum1 = supply == 0
            ? 0
            : ((supply - 1) * (supply) * (2 * (supply - 1) + 1)) / 6;
        uint256 sum2 = supply == 0 && amount == 1
            ? 0
            : ((supply - 1 + amount) *
                (supply + amount) *
                (2 * (supply - 1 + amount) + 1)) / 6;
        uint256 summation = sum2 - sum1;
        return (summation * 1 ether) / 32000;
    }

    function getBuyPrice(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public view returns (uint256) {
        return getPrice(fremesSupply[fremesSubject][ticker], amount);
    }

    function getSellPrice(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public view returns (uint256) {
        return getPrice(fremesSupply[fremesSubject][ticker] - amount, amount);
    }

    function getBuyPriceAfterFee(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public view returns (uint256) {
        uint256 price = getBuyPrice(fremesSubject, ticker, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        uint256 communityFee = (price * communityFeePercent) / 1 ether;

        // If the benfactors dont exist then the benefactor fee goes to the community. Regardless, the calculation will be 2*benefactorFeePercent
        uint256 benefactorFee = (price *
            benefactorFeePercent *
            benefactorLimit) / 1 ether;

        return price + protocolFee + subjectFee + communityFee + benefactorFee;
    }

    function getSellPriceAfterFee(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public view returns (uint256) {
        uint256 price = getSellPrice(fremesSubject, ticker, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        uint256 communityFee = (price * communityFeePercent) / 1 ether;

        //  If the benfactors dont exist then the benefactor fee goes to the community. Regardless, the calculation will be 2*benefactorFeePercent
        uint256 benefactorFee = (price *
            benefactorFeePercent *
            benefactorLimit) / 1 ether;

        return price - protocolFee - subjectFee - communityFee - benefactorFee;
    }

    // A createFreme function that creates a new freme with a ticker. fremesSubject is msg.sender. initialize the fremesBalance to 0 and then grant the first freme to the fremesSubject. Function can take exactly 3 addresses as benefactors and set them as benefactors for the freme
    function createFreme(
        string memory ticker,
        address benefactor1,
        address benefactor2
    ) public {
        require(fremesSupply[msg.sender][ticker] == 0, "Freme already created");

        // Only set the benefactors if they are not 0 addresses
        if (benefactor1 != address(0)) {
            benefactors[msg.sender][ticker][0] = benefactor1;
        }
        if (benefactor2 != address(0)) {
            benefactors[msg.sender][ticker][1] = benefactor2;
        }

        fremesBalance[msg.sender][ticker][msg.sender] = 1;
        fremesSupply[msg.sender][ticker] = 1;
    }

    // A setBenefactor function
    function setBenefactor(
        address benefactor,
        address creator,
        string memory ticker,
        uint256 index
    ) public {
        // Reuire that the freme has been created
        require(fremesSupply[msg.sender][ticker] > 0, "Freme not created");

        // Require that the index is less than the benefactor limit
        require(index < benefactorLimit, "Benefactor limit exceeded");

        // Only the creator can set benefactors
        require(creator == msg.sender, "Only the creator can set benefactors");

        // If the index has been set before, then revert
        require(
            benefactors[msg.sender][ticker][index] == address(0),
            "Benefactor already set"
        );

        benefactors[msg.sender][ticker][index] = benefactor;
    }

    // A benefactor address can replace themselves with another address
    function replaceBenefactor(
        address newBenefactor,
        address creator,
        string memory ticker,
        uint256 index
    ) public {
        require(
            benefactors[creator][ticker][index] == msg.sender,
            "Only the benefactor can replace themselves"
        );

        benefactors[creator][ticker][index] = newBenefactor;
    }

    struct Fee {
        uint256 benefactorFee1;
        uint256 benefactorFee2;
        uint256 communityFee;
        uint256 subjectFee;
        uint256 protocolFee;
    }

    function buyFremes(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public payable {
        uint256 supply = fremesSupply[fremesSubject][ticker];
        require(
            supply > 0,
            "Freme doesn't exist. Please create the freme first"
        );
        uint256 price = getPrice(supply, amount);
        Fee memory fee = Fee(0, 0, 0, 0, 0);

        fee.protocolFee = (price * protocolFeePercent) / 1 ether;

        fee.subjectFee = (price * subjectFeePercent) / 1 ether;

        fee.communityFee = (price * communityFeePercent) / 1 ether;
        // uint256 benefactorFee1 = 0;
        // uint256 benefactorFee2 = 0;
        // BenefactorFee memory benefactorFee = BenefactorFee(0, 0);

        if (benefactors[fremesSubject][ticker][0] != address(0)) {
            fee.benefactorFee1 = (price * benefactorFeePercent) / 1 ether;
        } else {
            //if no Benefactor 1, add that to the community fee
            fee.communityFee =
                fee.communityFee +
                (price * benefactorFeePercent) /
                1 ether;
        }

        if (benefactors[fremesSubject][ticker][1] != address(0)) {
            fee.benefactorFee2 = (price * benefactorFeePercent) / 1 ether;
        } else {
            //if no benefactor 2, add that to the community fee
            fee.communityFee =
                fee.communityFee +
                (price * benefactorFeePercent) /
                1 ether;
        }

        require(
            msg.value >=
                price +
                    fee.protocolFee +
                    fee.subjectFee +
                    fee.communityFee +
                    fee.benefactorFee1 +
                    fee.benefactorFee2,
            "Insufficient payment"
        );

        fremesBalance[fremesSubject][ticker][msg.sender] =
            fremesBalance[fremesSubject][ticker][msg.sender] +
            amount;

        fremesSupply[fremesSubject][ticker] = supply + amount;
        emit Trade(
            msg.sender,
            fremesSubject,
            ticker,
            true,
            amount,
            price,
            fee.protocolFee,
            fee.subjectFee,
            fee.communityFee,
            (fee.benefactorFee1 + fee.benefactorFee1),
            supply + amount
        );
        (bool success1, ) = protocolFeeDestination.call{value: fee.protocolFee}(
            ""
        );
        (bool success2, ) = fremesSubject.call{value: fee.subjectFee}("");
        (bool success3, ) = communityFeeDestination.call{
            value: fee.communityFee
        }("");
        // If benefactor 1 is not 0 address, send the benefactor fee to the benefactor
        if (benefactors[fremesSubject][ticker][0] != address(0)) {
            (bool success4, ) = benefactors[fremesSubject][ticker][0].call{
                value: fee.benefactorFee1
            }("");
        }
        // If benefactor 2 is not 0 address, send the benefactor fee to the benefactor
        if (benefactors[fremesSubject][ticker][1] != address(0)) {
            (bool success5, ) = benefactors[fremesSubject][ticker][1].call{
                value: fee.benefactorFee2
            }("");
        }
        require(success1 && success2 && success3, "Unable to send funds");
    }

    function sellFremes(
        address fremesSubject,
        string memory ticker,
        uint256 amount
    ) public payable {
        uint256 supply = fremesSupply[fremesSubject][ticker];
        require(supply > amount, "Cannot sell the last freme");

        uint256 price = getPrice(supply - amount, amount);
        Fee memory fee = Fee(0, 0, 0, 0, 0);

        fee.protocolFee = (price * protocolFeePercent) / 1 ether;
        fee.subjectFee = (price * subjectFeePercent) / 1 ether;

        fee.communityFee = (price * communityFeePercent) / 1 ether;
        fee.benefactorFee1 = 0;
        fee.benefactorFee2 = 0;

        if (benefactors[fremesSubject][ticker][0] != address(0)) {
            fee.benefactorFee1 = (price * benefactorFeePercent) / 1 ether;
        } else {
            //if no Benefactor 1, add that to the community fee
            fee.communityFee =
                fee.communityFee +
                (price * benefactorFeePercent) /
                1 ether;
        }

        if (benefactors[fremesSubject][ticker][1] != address(0)) {
            fee.benefactorFee2 = (price * benefactorFeePercent) / 1 ether;
        } else {
            //if no benefactor 2, add that to the community fee
            fee.communityFee =
                fee.communityFee +
                (price * benefactorFeePercent) /
                1 ether;
        }

        require(
            fremesBalance[fremesSubject][ticker][msg.sender] >= amount,
            "Insufficient fremes"
        );

        fremesBalance[fremesSubject][ticker][msg.sender] =
            fremesBalance[fremesSubject][ticker][msg.sender] -
            amount;
        fremesSupply[fremesSubject][ticker] = supply - amount;

        emit Trade(
            msg.sender,
            fremesSubject,
            ticker,
            false,
            amount,
            price,
            fee.protocolFee,
            fee.subjectFee,
            fee.communityFee,
            (fee.benefactorFee1 + fee.benefactorFee2),
            supply - amount
        );

        (bool success1, ) = msg.sender.call{
            value: price -
                fee.protocolFee -
                fee.subjectFee -
                fee.communityFee -
                fee.benefactorFee1 -
                fee.benefactorFee2
        }("");

        (bool success2, ) = protocolFeeDestination.call{value: fee.protocolFee}(
            ""
        );
        (bool success3, ) = fremesSubject.call{value: fee.subjectFee}("");

        (bool success4, ) = communityFeeDestination.call{
            value: fee.communityFee
        }("");

        // If benefactor 1 is not 0 address, send the benefactor fee to the benefactor
        if (benefactors[fremesSubject][ticker][0] != address(0)) {
            (bool success5, ) = benefactors[fremesSubject][ticker][0].call{
                value: fee.benefactorFee1
            }("");
        }
        // If benefactor 2 is not 0 address, send the benefactor fee to the benefactor
        if (benefactors[fremesSubject][ticker][1] != address(0)) {
            (bool success6, ) = benefactors[fremesSubject][ticker][1].call{
                value: fee.benefactorFee2
            }("");
        }

        require(
            success1 && success2 && success3 && success4,
            "Unable to send funds"
        );
    }
}
