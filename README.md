## JongDEX

<div align=center><h1>📚 STACKS</h1></div>

<div align=center> 

  <div align=center><h3>COLLABORATION TOOL</h3></div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <br>
  
  <div align=center><h3>FRONTEND</h3></div>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
   <br>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Caver-005A2B?style=for-the-badge&logo=Caver&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=redux&logoColor=white">
  <br>
  
  <div align=center><h3>BACKEND</h3></div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/Mongoose-D0021B?style=for-the-badge&logo=Mongoose&logoColor=white">
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=white">
  <br>
  
  <div align=center><h3>BLOCKCHAIN</h3></div>
  <img src="https://img.shields.io/badge/solidity-363636?style=for-the-badge&logo=solidity&logoColor=white">
  <img src="https://img.shields.io/badge/hardhat-124191?style=for-the-badge&logo=hardhat&logoColor=white">
  <img src="https://img.shields.io/badge/truffle-840010?style=for-the-badge&logo=truffle&logoColor=white">
  <img src="https://img.shields.io/badge/Kailkas-F5AE29?style=for-the-badge&logo=Kailkas&logoColor=black">
  <img src="https://img.shields.io/badge/KlaytnIDE-003366?style=for-the-badge&logo=KlaytnIDE&logoColor=white">
  <img src="https://img.shields.io/badge/ganache-A42E2B?style=for-the-badge&logo=ganache&logoColor=white">
  <br>
  
</div>

<!-- pdf parameters

---
urlcolor: #e3232c
linkcolor: #e3232c
---

-->
<!-- start intro: only for github, remove if creating a pdf -->


# JongDex <!-- omit in toc -->



## Contents<!-- omit in toc -->

- [Introduction](#introduction)
  - [Dex](#dex)
  - [Constant Product Formula](#constant-product-formula)
    - [Invariant](#invariant)
  - [Token Types](#token-types)
    - [ERC20](#erc20)
    - [KIP7](#kip7)
  - [Factory](#factory)
  - [Pair](#pair)
  - [Token Swap](#token-swap)
  - [Liquidity Pool](#liquidity-pool)
  - [Liquidity Provider](#liquidity-provider)
  - [Liquidity Provider Fee](#liquidity-provider-fee)
  - [Pool Tokens](#pool-tokens)
- [Smart Contracts](#smart-contracts)
  - [Deployment Order](#deployment-order)
  - [Core](#core)
    - [`DexFactory`](#dexfactory)
      - [Factory Contract: Functions](#factory-contract-functions)
        - [`createPair`](#createpair)
    - [`DexPair`](#dexpair)
      - [Pair Contract: Events](#pair-contract-events)
      - [Pair Contract: Functions](#pair-contract-functions)
        - [`mint`](#mint)
        - [`burn`](#burn)
        - [`swap`](#swap)
  - [Periphery](#periphery)
    - [`DexRouter`](#dexrouter)
      - [Adding Liquidity](#adding-liquidity)
      - [Removing Liquidity](#removing-liquidity)
      - [Swapping tokens](#swapping-tokens)
    - [`DexLibrary`](#dexlibrary)
      - [Library Contract: Functions](#library-contract-functions)
        - [`getAmountOut`](#getamountout)
        - [`getAmountIn`](#getamountin)
  - [Farming and Staking](#farming-and-staking)
    - [`Farming`](#farming)
      - [Allocation Points](#allocation-points)
      - [Farming: PoolInfo](#farming-poolinfo)
      - [Farming: UserInfo](#farming-userinfo)
      - [Farming: Events](#farming-events)
      - [Farming: Reward Debt and Pending Reward](#farming-reward-debt-and-pending-reward)
      - [Farming: Functions](#farming-functions)
        - [Farming: `updatePool`](#farming-updatepool)
        - [Farming: `getMultiplier`](#farming-getmultiplier)
    - [`StakingFactory`](#stakingfactory)
      - [`deployPool`](#deploypool)
    - [`StakingInitializable`](#stakinginitializable)
      - [Staking: PoolInfo](#staking-poolinfo)
      - [Staking: UserInfo](#staking-userinfo)
      - [Staking: Events](#staking-events)
      - [Staking: Reward Debt and Pending Reward](#staking-reward-debt-and-pending-reward)
      - [Staking: Functions](#staking-functions)
        - [Staking: `_getMultiplier`](#staking-_getmultiplier)
        - [Staking: `_updatePool`](#staking-_updatepool)
- [Security Concerns](#security-concerns)
- [Calculations](#calculations)
- [Diagrams](#diagrams)
  - [Type 1 Smart Contract](#type-1-smart-contract)
  - [Type 2 Smart Contract](#type-2-smart-contract)

<!-- end intro: only for github, remove if creating a pdf -->

## Introduction

프로젝트 설계 개요 및 용어 정리

### Dex

Dex는 [일정한 상수곱](#constant-product-formula)으로 작동되고, 스마트 컨트랙트로 구현되는 자동화된 유동성 프로토콜. 사용자 정의 가능한 시스템으로 설계되었으므로 정의된 토큰 이코노미가 없고, Dex의 각 인스턴스는 고유한 토크노믹스를 정의.

### DEX platform

DEX platform은 다른 [Dex protocol](#dex), farming과 staking 같은 다른 스마트 컨트랙트와 결합하여 사용됩니다.

### Constant Product Formula

[Dex](#dex)에서 사용하는 자동화된 시장 형성 알고리즘  : `x * y = k`.

#### Invariant

[constant product formula](#constant-product-formula) `k` 값은 불변.

### Token Types

[Dex protocol](#dex)은 스마트 컨트랙트 내에서 ERC20와 KIP7 토큰 표준과 함께 작동합니다.

### Factory

Factory는 KLAY/KIP7, KIP7/KIP7 페어에 대한 고유한 스마트 컨트랙트를 배포하는 스마트 컨트랙트. [`DexFactory` contract](#dexfactory) 참조.

### Pair

Pair는 KLAY/KIP7, KIP7/KIP7 등 두개의 토큰 페어간에 거래를 가능하게 하는 스마트 컨트랙트. [`DexPair` contract](#dexpair) 참조.

### Token Swap

Token swap은 KIP7 토큰을 다른 토큰과 교환하는 행위 입니다. 각 토큰 쌍은 [liquidity pool](#liquidity-pool)에 의해 구동됩니다.

The [`DexPair`](#dexpair)은 low-level swap기능을 정의하고, [`DexRouter`](#dexrouter) contract는 스왑 작업을 수행합니다.

### Liquidity Pool

Liquidity pool은 두 개의 토큰을 보유하고 deposit과 withdraw에 대한 규칙을 시행합니다. [Farming and Staking](#farming-and-staking) 참조.

### Liquidity Provider

A liquidity provider는 [liquidity pool](#liquidity-pool)에 해당 토큰 쌍을 예치하고 그 대가로 [pool tokens](#pool-tokens)을 받는 사람. 가격 위험을 감수하고 수수료를 보상으로 받습니다.

### Liquidity Provider Fee

토큰 교환에 대한 Liquidity Provider Fee는 0.3%이며, 이는 유동성 준비금에 대한 기여도에 비례하여 유동성 공급자에 의해 분할됩니다.

### Pool Tokens

유동성이 풀에 예치되면 유동성 토큰(LP 토큰)으로 알려진 고유한 토큰이 발행되어 공급자의 주소로 전송됩니다. 이 토큰은 풀에 대한 주어진 유동성 공급자의 기여도를 나타냅니다.

공급자가 받는 유동성 토큰의 수는 제공된 풀 유동성의 비율에 따라 결정됩니다. [`mint`](#mint) 참조

## Smart Contracts

JongDex는 [Core contracts](#core)와 [Periphery contracts](#periphery)으로 구성된 시스템인 Uniswap V2 스마트 컨트랙트 시스템을 사용.

### Deployment Order

Smart contracts are deployed in the following order:

1. WKLAY (needed for testnet)
2. [Dex Factory](#dexfactory)
3. [Dex Router](#dexrouter)
4. Dex Token(Platform Token)
5. [Farming](#farming)
6. [Staking Factory](#stakinginitializable)

### Core

#### `DexFactory`

Factory (`DexFactory`)컨트랙트는 아직 배포되지 않은 KIP7/KIP7, KLAY/KIP7 페어 쌍에 고유한 스마트 컨트랙트를 배포하는 스마트 컨트랙트.

pair쌍이 배포된 순서는 `allPairs`를 통해 액세스 할 수 있습니다.

factory컨트랙트는 또한 프로토콜 전체의 fee 수신자를 관리하는데, `feeToSetter`를 통해 fee 수신자를 정의하고 변경할 수 있는 address를 설정할 수 있습니다.

##### Factory Contract: Functions

<!-- github table -->

|          Function           |                                Description                                |
| --------------------------- | ------------------------------------------------------------------------- |
| `createPair`                | 두 토큰 쌍에 대해 pair가 존재하지 않는 경우 pair를 만듭니다.   |
| `getPair`                   | 두 토큰 쌍이 존재하는 경우 그 주소를 리턴합니다.              |
| `setFeeToSetter`            | 프로토콜의 fee 수신자의 address를 설정합니다.              |
| `setFeeTo`                  | 설정된 주소가 프로토콜 전체의 fee 수신자를 제어하도록 허용합니다. |
| `allPairsLength`            | 지금까지 생성된 모든 토큰 pair의 수를 반환합니다              |


#### `DexPair`

Pair (`DexPair`) 는 factory 컨트랙트에 의해 배포되고, 2개의 KIP7 토큰 간 거래를 가능하게 합니다.

각 토큰 pair의 스마트 컨트랙트는 2개의 KIP7 토큰으로 구성된 liquidity pool, 유동성 풀을 관리하고 해당 토큰 pair의 최소 유동성은  `MINIMUM_LIQUIDITY`를 통해 정의됨.

pair 컨트랙트는 다음과 같은 변수를 갖는다. 두 토큰의 reserves, 최신블록의 timestamp, 두 토큰의 최신 가격, 그리고 두 reserves로 계산된 k값.

##### Pair Contract: Events

- `Mint` event는 lp토큰이 생성되면 sender address와 토큰 pair의 각 token amounts가 담긴 정보와 함께 이벤트 발생.
- `Burn` event는 lp토큰이 소각될 때, sender address와 recipient address, token amounts가 담긴 정보와 함께 이벤트 발생.
- `Swap` event는 swap이 발생했을 때, sender address와 recipient address, swap amounts 및 received amounts가 담긴 정보와 함께 이벤트 발생
- `Sync` event는 mint, burn, swap의 결과로 reserve가 업데이트 되면 reserve 정보와 함께 이벤트 발생
- 
##### Pair Contract: Functions

<!-- github table -->

|    Function     |                                                                                     Description                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `initialize`    | 두 토큰 address가 주어지면 factory contract는 pair contract를 initialize함. pair contract가 배포될 때 호출됨. |
| `getReserves`   | 토큰 pair에 대한 상호 작용이 포함된 최신 블록의 타임스탬프와 함께 두 토큰의 보유량을 반환                                  |
| [`mint`](#mint) | lp 토큰 생성                                                                                                                                                                  |
| [`burn`](#burn) | lp 토큰 소각                                                                  |
| [`swap`](#swap) | 토큰 Swap                       |


<!-- github table -->

###### `mint`

`mint` function은`DexPair` 컨트랙트를 통해 유동성이 추가될때 호출되는 함수. 

만약 풀이 새로 생성되었고, lp토큰이 아직 없는 경우 liquidity는 두 토큰의 발행량의 곱에서 상수 값을 빼서 계산됩니다.

```
sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY
```
풀의 첫번째 `MINIMUM_LIQUIDITY`는 영구적으로 lock.

풀의 lp토큰 총 공급량이 0이 아닌 경우의 유동성은 다음과 같이 계산됩니다.

1. 각 토큰의 발행량을 풀의 lp토큰 수로 곱하고 이 토큰의 보유량으로 나눕니다.
2. 다음 두 값 중 최소값을 선택합니다.
   
   ```
   min((amount0 * _totalSupply) / _reserve0, (amount1 * _totalSupply) / _reserve1)
   ```

###### `burn`

`burn` function은 `DexPair` contract를 통해 유동성이 제거될 때 호출되는 함수

pair의 각 토큰에 대해 소각할 토큰의 양은 토큰 잔액과 토큰 pair의 유동성을 곱한 다음, 풀에 있는 lp 토큰 수로 나눕니다.

###### `swap`

`swap` function은`DexPair` contract를 통해 토큰을 교환할 때 호출되는 함수입니다.

토큰이 호출 되기 전에 pair로 전송되어야 하는 방식으로 작동합니다.


### Periphery

#### `DexRouter`

DexRouter contract는 유동성을 추가 및 제거하고 토큰을 교환하는 기능을 정의.

##### Adding Liquidity

Functions for adding liquidity for a pair of tokens:

- `addLiquidity` function은 kip7/kip7 풀에 유동성을 공급하는 함수
- `addLiquidityKLAY` function은 klay/kip7 풀에 유동성을 공급하는 함수

만약 pair가 존재하지 않는 경우 Factory contract를 호출해 원하는 양의 토큰으로 새 pair를 생성합니다.

이 함수는 풀로 전송된 토큰의 양과 mint를 통해 발행된 lp토큰의 양을 return합니다.

##### Removing Liquidity

There are multiple functions for removing liquidity for a pair of tokens:

- `removeLiquidity` function은 kip7/kip7 풀에 유동성을 제거하는 함수
- `removeLiquidityKLAY` function은 klay/kip7 풀에 유동성을 공급하는 함수

이 함수는 풀에서 받은 토큰의 양을 return합니다.

##### Swapping tokens

There are multiple functions for swapping tokens for different kinds of swap operations.

Functions for receiving tokens:

- `swapTokensForExactTokens` 가능한 적은 amounts의 토큰 입력값에 대해 정확한 양의 출력되는 토큰의 amounts로 교환
- `swapTokensForExactKLAY` 가능한 적은 amounts의 토큰 입력값에 대해 정확한 양의 출력되는 klay의 amounts로 교환
- `swapKLAYForExactTokens` 가능한 적은 amounts의 klay에 대해 정확한 amounts의 토큰으로 교환.
- 
Functions for sending tokens:

- `swapExactTokensForTokens` 정확한 amounts의 토큰 입력값을 가능한 많은 amounts의 토큰으로 교환
- `swapExactKLAYForTokens` 정확한 amounts의 klay 입력값을 가능한 많은 amounts의 토큰으로 교환
- `swapExactTokensForKLAY` 정확한 amounts의 토큰 입력값을 가능한 많은 amounts의 klay로 교환


스왑 기능에 대한 입력 파라미터는 path입니다. 예를 들어 각 연속 주소 pair에 대해 pair contract가 충분한 유동성을 가지고 있어야 합니다. 첫 번째 요소는 입력 토큰이고 마지막 요소는 출력 토큰입니다. 입력 및 출력 토큰에 대한 쌍 계약이 없는 경우 스왑을 수행할 중간 쌍을 정의합니다.

#### `DexLibrary`


##### Library Contract: Functions

<!--github table -->

|            Function             |                                                                                                     Description                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sortTokens`                    | 토큰 pair에 대해 정렬된 토큰 주소를 return                                                                                                                                               |
| `pairFor`                       | 외부 호출 없이 pair에 대한 주소를 return                                                                                                                                          |
| `getReserves`                   | pair에 대한 reserve를 가져오고 정렬합니다.                                                                                                                                              |
| `quote`                         | 하나의 amount와 reserveA, reserveB가 주어졌을 때 다른 자산과 동일한 금액을 반환. amountB = amountA * reserveB / reserveA |
| [`getAmountOut`](#getamountout) | Input amount가 주어졌을 때 최대 output amount를 계산해줍니다 .                 |
| [`getAmountIn`](#getamountin)   | Output amount가 주어졌을 때 필요한 input amount를 계산해줍니다.|
| `getAmountsOut`                 | 여러 pair에 대해 연쇄적으로 getAmountout을 수행합니다.  |
| `getAmountsIn`                  | 여러 pair에 대해 연쇄적으로 getAmountin을 수행합니다.    |

###### `getAmountOut`

`amountIn`과 pair reserves(`reserveIn`, `reserveOut`)이 주어지면 pair에서 최대 output을 return합니다.

1. Find the input amount after the fee is calculated. Fee is 0.3%. The adjusted input value (`amountInWithFee`) can be calculated by multiplying the input amount by 997:
   ```
   amountIn * 997
   ```
2. Calculate the product of `amountInWithFee` and the reserve for the other token:
   ```
   amountInWithFee * reserveOut
   ```
3. Find the sum of adjusted input value (`amountInWithFee`) and the reserve of input asset multiplied by 1000 (`reserveIn * 1000`):
   ```
   reserveIn * 1000 + amountInWithFee
   ```
4. To find the output amount, divide the value calculated in step 2 by the value calculated in step 3:
   
   ```
   (amountInWithFee * reserveOut) / (reserveIn * 1000 + amountInWithFee)
   ```

This is the maximum amount of the other asset that could be given for the provided input amount.

###### `getAmountIn`

Given an output amount of an asset (`amountOut`) and pair reserves (`reserveIn`, `reserveOut`), the functions returns the required input amount of the other asset (`amountIn`).

1. Find the product of the output amount (`amountOut`) and the reserve of the other asset (`reserveIn`), then multiply it by `1000`:
   ```
   reserveIn * amountOut * 1000
   ```
2. Subtract the output amount (`amountOut`) from the reserve for this asset (`reserveOut`), then the multiply the result by 997 (the fee is 0.3%):
   ```
   (reserveOut - amountOut) * 997
   ```
3. To find the required input amount, divide the value calculated in step 1 by the value calculated in step 2:
   ```
   (reserveIn * amountOut * 1000) / ((reserveOut - amountOut) * 997)
   ```

### Farming and Staking

Smart contracts for farming activities only support KIP7 standard tokens. Smart contracts for staking activities support both ERC20 and KIP7 standard tokens.

Smart contracts for farming and staking are implemented using two different types of smart contracts. The main difference between the two is in the way the rewards are distributed across pools. 

The `Farming` contract is a [Type 1 smart contract](#type-1-smart-contract). The pools in this type of contract are not independent from one another, there is a single reward pool for all the farming pools within this contract.

The `Staking` contract is a [Type 2 smart contract](#type-2-smart-contract) with pools that are independant from each other in terms of reward distribution.

#### `Farming`

The contract that manages the farming operations with [LP tokens](#pool-tokens). To deploy the contract, the following is needed:

- the address of the platform token, also called **PTN token** (`ptn`)
- the address of the [multisignature contract](#multisignature-wallet), which will own the contract (`multisig`)
- the number of PTN tokens created per block (`ptnPerBlock`)
- the block at which the minting of PTN tokens starts (`startBlock`)

The `Farming` contract defines two structures:

- [`UserInfo`](#farming-userinfo) contains information about each user that stakes LP tokens
- [`PoolInfo`](#farming-poolinfo) contains information about each pool

##### Allocation Points

The number of allocation points assigned to the farming pool is the number of platform tokens to distribute per block.
Total number of allocation points (`totalAllocPoint`) in the farming contract is the sum of all allocation points in all farming pools.

##### Farming: PoolInfo

The structure contains the following information about the pool:

- the address of the LP token contract (`lpToken`)
- the bonus multiplier for the farming pool (`bonusMultiplier`)
- the amount of LP tokens staked in the pool (`totalStaked`)
- the last block in which the PTN tokens were distributed (`lastRewardBlock`)
- the block after which the pool won't get any bonuses from the bonus multiplier for this farming pool (`bonusEndBlock`)
- the accumulated PTN tokens per share multiplied by the `ACC_PRECISION` constant (`accPtnPerShare`)
- the number of [allocation points](#allocation-points) assigned to the pool (`allocPoint`)

##### Farming: UserInfo

The structure contains the information about the amount of LP tokens that the user provided (`amount`) and their reward debt (`rewardDebt`).

See [reward debt calculation](#farming-reward-debt-and-pending-reward).

##### Farming: Events

- When a new pool is added via `add`, `AddPool` is emitted with the id of the pool that was added and the following information: the number of its allocation points, the address of the token, the bonus multiplier for the farming pool, the block after which the pool won't get any bonuses.
- When the number of PTN allocation points for a pool is updated via `set`, `SetPool` is emitted with the id of the pool and the number of its allocation points.
- When rewards for a pool are [updated](#farming-updatepool), `UpdatePool` is emitted with the id of the pool that was updated and the following information: the last block in which PTN tokens are distributed, the number of LP tokens in the pool, and accumulated PTNs per share.
- When LP tokens are deposited via `deposit`, `Deposit` is emitted with the information about the user that made the deposit, the amount of tokens that were deposited and the pool id.
- When LP tokens are withdrawn via `withdraw` or `emergencyWithdraw`, `Withdraw` or `EmergencyWithdraw` is emitted with the information about the user that made the withdrawal, the amount of tokens that were withdrawn and the pool id.
- When the reward per block is updated via `updatePtnPerBlock`, `UpdateRewardPerBlock` is emitted.
- When the multiplier is updated for a pool via `updateMultiplier`, `UpdatePoolMultiplier` is emitted with the id of the pool for which the multiplier was updated and the new multiplier value.

##### Farming: Reward Debt and Pending Reward

**Pending reward** is the number of platform tokens that the user is entitled to receive but have not yet received. To find the pending reward, the `rewardDebt` is subtracted from the product of the amount of LP tokens the user provided (`amount`) and the accumulated PTN tokens per share (`accPtnPerShare`), divided by the `ACC_PRECISION` constant of the farming contract:

```
(user.amount * pool.accPtnPerShare) / ACC_PRECISION - user.rewardDebt
```

Whenever the user `deposit`s or `withdraw`s LP tokens to a pool, the following calculations happen:

1. The `accPtnPerShare` and `lastRewardBlock`) values in the corresponding [pool](#farming-poolinfo) are updated using [`updatePool`](#farming-updatepool) function.
2. The user receives the **pending reward**.
3. The `amount` of LP tokens the user provided is updated.
4. The total number of LP tokens in the pool (`totalStaked`) is updated.
5. The `rewardDebt` for the user is updated. The reward debt is calculated as follows:
   ```
   (user.amount * pool.accPtnPerShare) / ACC_PRECISION
   ```

##### Farming: Functions

<!-- github table -->

|                 Function                  |                                                                                                          Description                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `add`                                     | Add a new LP farming pool. Can only be called by the [`multisig` contract](#multisignature-wallet). A new pool is added based on the address of the LP token, the number of allocation points, and the pool reward multiplier. |
| `deposit`                                 | Deposit the specified amount of LP tokens to the specified pool. See [reward debt and pending reward calculation](#farming-reward-debt-and-pending-reward).                                                                    |
| `withdraw`                                | Withdraw the specified amount of LP tokens from the specified pool. See [reward debt and pending reward calculation](#farming-reward-debt-and-pending-reward).                                                                 |
| `emergencyWithdraw`                       | Withdraw LP tokens from the specified pool without receiving the reward. This is only for emergencies.                                                                                                                         |
| `set`                                     | Update the number of PTN allocation points for the given pool. Can only be called by the [`multisig` contract](#multisignature-wallet).                                                                                        |
| [`updatePool`](#farming-updatepool)       | Update reward variables for the given pool.                                                                                                                                                                                    |
| `massUpdatePools`                         | Update PTN reward for all active pools. The `updatePool` function is called on all pools that are active.                                                                                                                      |
| `updateMultiplier`                        | Update reward multiplier for the specified pool. The `bonusMultiplier` in the `PoolInfo` is updated with the provided value.                                                                                                   |
| `updatePtnPerBlock`                       | Update the number of PTN tokens created per block.                                                                                                                                                                             |
| [`getMultiplier`](#farming-getmultiplier) | Return the reward multiplier between two given blocks for the specified pool.                                                                                                                                                  |
| `safePtnTransfer`                         | Safely transfer the specified amount of PTN tokens to the given address. This is needed in case the rounding error causes a pool to not have enough PTN tokens.                                                                |                                                                                                                                                             |

<!-- pdf table 


---------------------------------------------------------------------------------------------------------------------------------------------
Function                                  Description
----------------------------------------- ---------------------------------------------------------------------------------------------------
`add`                                     Add a new LP farming pool. Can only be called by the [`multisig` contract](#multisignature-wallet).
                                          A new pool is added based on the address of the LP token, the number of allocation points,
                                          and the pool reward multiplier.

`deposit`                                 Deposit the specified amount of LP tokens to the specified pool.
                                          See [reward debt and pending reward calculation](#farming-reward-debt-and-pending-reward).

`withdraw`                                Withdraw the specified amount of LP tokens from the specified pool.
                                          See [reward debt and pending reward calculation](#farming-reward-debt-and-pending-reward).

`emergencyWithdraw`                       Withdraw LP tokens from the specified pool without receiving the reward.
                                          This is only for emergencies.

`set`                                     Update the number of PTN allocation points for the given pool.
                                          Can only be called by the [`multisig` contract](#multisignature-wallet).

[`updatePool`](#farming-updatepool)       Update reward variables for the given pool.

`massUpdatePools`                         Update PTN reward for all active pools.
                                          The `updatePool` function is called on all pools that are active.

`updateMultiplier`                        Update reward multiplier for the specified pool.
                                          The `bonusMultiplier` in the `PoolInfo` is updated with the provided value.

`updatePtnPerBlock`                       Update the number of PTN tokens created per block.

[`getMultiplier`](#farming-getmultiplier) Return the reward multiplier between two given blocks for the specified pool.

`safePtnTransfer`                         Safely transfer the specified amount of PTN tokens to the given address.
                                          This is needed in case the rounding error causes a pool to not have enough PTN tokens.
---------------------------------------------------------------------------------------------------------------------------------------------

-->

###### Farming: `updatePool`

The function updates the reward variables for the given pool.

1. Find the multiplier using [`getMultiplier`](#farming-getmultiplier).
2. Calculate the pending reward:
   - Find the product of the multiplier calculated in the previous step, the number of PTN tokens created per block (`ptnPerBlock`), and the number of allocation points in the pool (`allocPoint`).
   - Divide the resulting value by the total number of allocation points (`totalAllocPoint`, which is the sum of all allocation points in all pools).
3. Update the value for accumulated PTN tokens per share (`accPtnPerShare`):
   - Find the product of pending reward and the `ACC_PRECISION` constant, then divide it by the total number of tokens staked in the pool.
   - Add the resulting value to the current value of `accPtnPerShare`.

Refer to [reward debt and pending reward](#farming-reward-debt-and-pending-reward) for more information.

###### Farming: `getMultiplier`

The function returns the reward multiplier for the farming pool for the given start (`_from`) and end (`_to`) blocks.

The multiplier depends on whether the end block is before or after the `bonusEndBlock`:

- If the end block occurs before `bonusEndBlock`, the multiplier is the product of the `bonusMultiplier` and the difference between the end block and the start block numbers (`_to - _from`).
- If the start block occurs after `bonusEndBlock`, the multiplier is the difference between the end block and the start block numbers `(_to - _from)`.
- In other cases, the multiplier is the sum of the following two values:
  - the product of the the `bonusMultiplier` and the difference between `bonusEndBlock` and the start block numbers `(poolInfo[_pid].bonusEndBlock - _from)`
  - the difference between the start block and `bonusEndBlock`


#### `StakingFactory`

Long-term staking allows users to stake the Dex token and earn other tokens as rewards.

The contract deploys a new staking pool contract using [`deployPool`](#deploypool). The created contract is owned by the [`multisig` contract](#multisignature-wallet).

##### `deployPool`

The contract for the new staking pool is deployed using `StakingInitializable` contract based on the following:

- staked token address
- reward token address
- reward per block (in reward tokens)
- the start and end blocks
- the pool limit per user (in staked tokens)
- the multisig address
- the limit of the number of blocks available for a user

The function returns the address of a new staking pool contract.

#### `StakingInitializable`

The staking factory contract (`StakingFactory`) deploys the `StakingInitializable` contract when a new staking pool is deployed. This contract initializes a new pool.

The contract defines two structures: 
- [`UserInfo`](#staking-userinfo) contains information about each user that stakes tokens
- [`PoolInfo`](#staking-poolinfo) contains information about each staking pool

##### Staking: PoolInfo

The structure contain the following information about the pool:

- whether the pool is initialized 
- the addresses of the staked and reward tokens
- the blocks at which PTN minting starts and ends
- the last block in which the pool was updated
- whether there is a limit set for users
- the max number of blocks available for each user after the start block
- the pool limit (in staked token) per user
- the accrued token per share
- the amount of PTN tokens created per block
- the total amount of staked tokens

##### Staking: UserInfo

The structure contains the information about the amount of staked tokens that the user provided (`amount`) and their reward debt (`rewardDebt`).

##### Staking: Events

- `Deposit` with the information about the user that made the deposit and the deposited amount
- `Withdraw` and `EmergencyWithdraw` with the information about the user that made the withdrawal and the withdrawn amount
- `UpdatePool` with the information about the block that was last updated, the accrued token per share, and the total amount of staked tokens
- `NewStartAndEndBlocks` with the blocks at which PTN minting starts and ends
- `NewRewardPerBlock` with the amount of PTN tokens created per block
- `NewPoolLimit` with the the information about pool limit
- `RewardsStop` with the block at which to stop rewards
- `TokenRecovery` with the information about the user that received recovered tokens and the amount of tokens recovered

##### Staking: Reward Debt and Pending Reward

**Pending reward** is the number of reward tokens that the user is entitled to receive but have not yet received. To find the pending reward, the `rewardDebt` is subtracted from the product of the amount tokens staked by the user and the accrued token per share for the given pool (`accTokenPerShare`), divided by the `PRECISION_FACTOR` constant of the staking contract:

```
(user.amount * pool.accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt
```

Whenever the user `deposit`s or `withdraw`s staked tokens to a pool, the following calculations happen:

1. The `accTokenPerShare` and `lastRewardBlock` values in the corresponding [pool](#staking-poolinfo) are updated using [`_updatePool`](#staking-_updatepool).
2. The user receives the **pending reward**.
3. The `amount` of staked tokens the user provided is updated.
4. The total number of staked tokens in the pool (`totalStaked`) is updated.
5. The `rewardDebt` for the user is updated. The reward debt is calculated as follows:
   ```
   (user.amount * pool.accTokenPerShare) / PRECISION_FACTOR
   ```

##### Staking: Functions

|                  Function                   |                                                    Description                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `initialize`                                | Initialize the staking contract. The contract is owned by the [multisig contract](#multisignature-wallet).         |
| `deposit`                                   | Deposit staked tokens and collect reward tokens (if any).                                                          |
| `withdraw`                                  | Withdraw staked tokens and collect reward tokens (if any).                                                         |
| `recoverToken`                              | Recover tokens sent to the contract by mistake. Can only be called by [multisig contract](#multisignature-wallet). |
| `updatePoolLimitPerUser`                    | Update pool limit per user. Can only be called by [multisig contract](#multisignature-wallet).                     |
| `updateRewardPerBlock`                      | Update reward per block. Can only be called by [multisig contract](#multisignature-wallet).                        |
| `updateStartAndEndBlocks`                   | Update the start and end blocks. Can only be called by [multisig contract](#multisignature-wallet).                |
| [`_updatePool`](#staking-_updatepool)       | Update reward variables for the given pool.                                                                        |
| [`_getMultiplier`](#staking-_getmultiplier) | Return reward multiplier between two given blocks for the specified pool.                                          |
| `hasUserLimit`                              | Check if the user limit is set. (?)                                                                                |

For emergency situations:

<!-- github table -->

|         Function          |                                                     Description                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `emergencyWithdraw`       | Withdraw staked tokens without receiving any rewards.                                                               |
| `emergencyRewardWithdraw` | Transfer reward tokens to the specified address. Can only be called by [multisig contract](#multisignature-wallet). |
| `stopReward`              | Stop pool rewards. Can only be called by [multisig contract](#multisignature-wallet).                               |



<!-- pdf table

---------------------------------------------------------------------------------------------------------------------
Function                   Description
-------------------------  ------------------------------------------------------------------------------------------
`emergencyWithdraw`        Withdraw staked tokens without receiving any rewards.  

`emergencyRewardWithdraw`  Transfer reward tokens to the specified address.
                           Can only be called by [multisig contract](#multisignature-wallet).

`stopReward`               Stop pool rewards. Can only be called by [multisig contract](#multisignature-wallet).
---------------------------------------------------------------------------------------------------------------------

-->

###### Staking: `_getMultiplier`

The functions returns the reward multiplier for the given start (`_from`) and end (`_to`) blocks.

The multiplier depends on the relation between the `rewardEndBlock` (the block at which PTN minting ends) and `_from`/`_to` blocks:

- If the `_to` occurs before `rewardEndBlock`, the multiplier is the difference between the end and the start block numbers (`_to - _from`).
- If the `_from` occurs after `rewardEndBlock`, the multiplier is `0` (rewards are no longer updated).
- In other cases, the multiplier is the difference between the `rewardEndBlock` and the start block numbers (`rewardEndBlock - _from`).


###### Staking: `_updatePool`

The function updates the reward variables for the given pool. If the current block number is higher than `rewardEndBlock` (the block at which PTN minting ends), the pool rewards are no longer updated.

1. Find the multiplier using [`_getMultiplier`](#staking-_getmultiplier).
2. Calculate the pending reward as the product of the multiplier calculated in the previous step and the reward per block (`rewardPerBlock`).
3. Update the value for accrued token per share (`accTokenPerShare`):
   
   - Find the product of pending reward and the `PRECISION_FACTOR` constant, then divide it by the total amount of staked tokens in the pool.
   - Add the resulting value to the current value of `accTokenPerShare`.

Refer to [reward debt and pending reward](#staking-reward-debt-and-pending-reward) for more information.



## Security Concerns

As mentioned above, there is no tokenomics defined in Dex protocol. Each instance of Dex would need to define and implement its own model, which might mean reworking or completely rewriting the smart contracts.

Reserves and balances should match. In case they do not (e.g. when adding tokens via transfers from outside of DEX platform), there are recovery mechanisms to force reserves and balances to match. These recovery mechanisms are `sync` and `skim` functions defined in [`DexPair` contract](#dexpair).

A lot of functionality on DEX platform is owned and controlled via [`multisig` contract](#multisignature-wallet). This contract is a multisignature wallet that allows multiple parties to agree on transactions before they are executed. However, it is still a single contract controlling other functionality, which means it poses security risks associated with the certain degree of system centralization.

DEX platform has emergency withdraw operations in place to fetch all rewards from a staking pool: `emergencyWithdraw` in both [staking](#stakinginitializable) and [farming](#farming) contracts, and `emergencyRewardWithdraw` in the [staking](#stakinginitializable) contract. The `emergencyRewardWithdraw` is controlled by the [`multisig` contract](#multisignature-wallet).

There are also security concerns common with other decentralized systems. These are intentional attacks such as:

- Sandwich attacks (front-running attack)
- Scam tokens
- Phishing attacks with similarly looking domains
- Pump-and-dump scam
- Arbitrage attacks

