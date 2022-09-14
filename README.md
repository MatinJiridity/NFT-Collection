
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


#### withdraw
```solidity
function withdraw() public onlyOwner 
```
Withdraw costs paid

Only the owner can withdraw from smart contract.


#### walletOfOwner
```solidity
function walletOfOwner(
    address _owner
) public returns (uint256[] memory)
```
Shows id tokens of users

Public function 

#### Parameters:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_owner` | `address` | Address of user |

#### Return Values:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tokenIds` | `uint256[]` | An array with a length of the balance of token that contains their ids |


#### tokenURI
```solidity
function tokenURI(
    uint256 _tokenId
) public returns (string memory)
```
Shows URI of token id 

Example: ipfs://QmTDC879jfw8e1SosKF5kXWkm/1.json 

#### Parameters:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_tokenId` | `uint256` | Token id |

#### Return Values:

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `URI` | `string` | With URI of token id you can access to metadata of that token id |




