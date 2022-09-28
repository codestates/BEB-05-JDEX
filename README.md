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
      - [Farming: Functions](#farming-functions)
    - [`StakingFactory`](#stakingfactory)
      - [`deployPool`](#deploypool)

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

1. 수수료 계산 후 입력 금액을 찾습니다. 수수료는 0.3%입니다. `amountInWithFee`은 입력 금액에 997을 곱하여 계산할 수 있습니다.
   ```
   amountIn * 997
   ```
2. `amountInWithFee` 와 다른 토큰의 reserve를 계산
   ```
   amountInWithFee * reserveOut
   ```
3. `amountInWithFee`와 입력 자산 reserve의 합계에 1000을 곱한 값을 구합니다.
   ```
   reserveIn * 1000 + amountInWithFee
   ```
4. 출력량을 찾으려면 2단계에서 계산한 값을 3단계에서 계산한 값으로 나눕니다.
   
   ```
   (amountInWithFee * reserveOut) / (reserveIn * 1000 + amountInWithFee)
   ```

이 값이 제공된 입력 금액에 대해 제공할 수 있는 다른 토큰의 최대 amount입니다.


###### `getAmountIn`

`amountOut`과 pair reserves (`reserveIn`, `reserveOut`)가 주어지면 다른 토큰의 필요한 입력 `amountIn`를 반환합니다.

1. (`amountOut`)과 다른 입력 자산의 (`reserveIn`)에  `1000`을 곱합니다.
   ```
   reserveIn * amountOut * 1000
   ```
2.  (`reserveOut`)에서 `amountOut`을 뺀 출력 값에 997을 곱합니다
   ```
   (reserveOut - amountOut) * 997
   ```
3. 필요한 입력 amount를 찾으려면 1단계에서 계산된 값을 2단계에서 계산된 값으로 나눕니다.
   ```
   (reserveIn * amountOut * 1000) / ((reserveOut - amountOut) * 997)
   ```

### Farming and Staking


#### `Farming`


##### Farming: Functions

<!-- github table -->

|                 Function                  |                                                                                                          Description                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `add`                                     | 새 LP 파밍 pool을 추가합니다. LP 토큰의 주소, allocation points, 풀 보상 배율을 기반으로 새로운 풀이 추가됩니다. |
| `deposit`                                 | 지정된 풀에 LP 토큰을 예치합니다.                                                      |
| `withdraw`                                | 지정된 풀에서 LP토큰을 인출합니다.                                                                 |
| `emergencyWithdraw`                       | 보상을 받지 않고 지정된 풀에서 LP 토큰을 인출합니다.                                                                                                                        |
| `set`                                     | 지정된 풀에서 JDEXT allocation points를 업데이트합니다.                                                                                        |
| [`updatePool`](#farming-updatepool)       | 주어진 풀에 대한 보상 변수를 업데이트합니다.                                                                                                                                                                                    |
| `massUpdatePools`                         | 모든활성 풀에대한 JDEXT 보상을 업데이트 합니다.                                                                                                                      |
| `updateMultiplier`                        | 지정된 풀에 대한 보상 multiplier을 업데이트합니다.                                                                                                  |
| `updatePtnPerBlock`                       | 블록당 생성된 JDEXT 토큰 수를 업데이트 합니다                                                                                                                                |
| [`getMultiplier`](#farming-getmultiplier) | 지정된 풀에대해 주어진 두 블록 사이의 multiplier를 return합니다.                                 |
| `safePtnTransfer`                         | 지정된 양의 JDEXT를 지정된 address로 transfer합니다.                                    |                                                                                                                                                             |

#### `StakingFactory`

스테이킹을 통해 사용자는 만들어진 풀에 대한 토큰을 스테이킹하고 JDEX토큰을 보상으로 얻을 수 있습니다.

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


##### Staking: Functions

|                  Function                   |                                                    Description                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `initialize`                                | 스테이킹 contract를 초기화합니다.        |
| `deposit`                                   | 스테이킹된 토큰을 예치하고 보상 토큰이 있는 경우 받습니다. |
| `withdraw`                                  | 스테킹된 토큰을 인출하고 보상 토큰이 있는 경우 받습니다.|
| `recoverToken`                              | 실수로 컨트랙트로 보낸 토큰을 복구합니다. |
| `updatePoolLimitPerUser`                    | 사용자당 풀 제한을 업데이트 합니다.            |
| `updateRewardPerBlock`                      | 블록당 보상을 업데이트합니다. |
| `updateStartAndEndBlocks`                   | 시작 및 종료 블록을 업데이트 합니다.  |
| [`_updatePool`](#staking-_updatepool)       | 주어진 풀에 대한 보상 변수를 업데이트합니다. |
| [`_getMultiplier`](#staking-_getmultiplier) | 지정된 풀에 대해 주어진 두 블록 사이의 보상 multiplier를 return 합니다   |
| `hasUserLimit`                              | user limit이 있는지 확인합니다 |



