
# NFT Collection

This is a NFT Collection Smart Contract that you can let your users mint nfts from your collection.

## Functions

We want to check functions of Main Contract (nftCollection);



#### mint
```solidity
function mint(
    uint256 _mintAmount
) public payable 
```
Public mint

Everybody by calling this function if the caller is not the owner and the contract not paused, by paying the cost they can mint nft.  

#### Parameters:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_mintAmount` | `uint256` | Amount of NFT |


#### mintFounders
```solidity
function mint(
    uint256 _mintAmount
) public  
```
Private mint

Only founders can call it

#### Parameters:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_mintAmount` | `uint256` | Amount of NFT |


#### mintForAddress
```solidity
function mintForAddress(
    uint256 _mintAmount, address _receiver
) public onlyOwner 
```
Customised mint

Only the owner can call it. The owner can mint NFTs for every address.

#### Parameters:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_mintAmount` | `uint256` | Amount of NFT |
| `_receiver` | `address` | Address of receiver |


#### withdraw
```solidity
function withdraw() public onlyOwner 
```
Withdraw costs paid

Only the owner can withdraw from smart contract.






