
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

<br/>

---

<br/>

<br/>

# 1. 팀 소개

### BEB-05-Final-04조

- **팀 명 : 종덱스**
- **프로젝트 명 : JDEX**
- **팀장 : 서종대**
- **팀원 : 김윤겸, 홍유진**
- **Github Repo : https://github.com/codestates/BEB-05-final-JDEX**
- **Date : 2022/08/31 - 2022/09/30**
- **팀 룰**
    
    → 매일 오전 10시, 오후 5시 필수 회의 진행회의록 작성
    
    → 회의록 작성
    
    → 그 날의 진행 계획 및 진행 중인 상황 공유
    
<br/>
<br/>

# 2. 프로젝트 개요

### 💸 **JDEX 프로젝트 목표**

### → *Klaytn 기반의 DEX(탈중앙화거래소) 구현.*

<aside>
➡️ **DEX; (Decentralized Exchange)**

**기존의 중앙화거래소(CEX)가 아닌 개인 간 금융(P2P)이 가능한 탈중앙화(분산형) 거래소.** 법정화폐와 암호화폐간의 교환을 허용하지 않고, 암호화폐 토큰을 다른 암호화폐 토큰과 거래하여 블록체인(분산 원장) 위에 구축 및 기록된 **스마트계약의 집합**이다.

</aside>
<br/>

### 💸 **JDEX** 란 ?

> **이젠 직접 자산을 관리하고 예치하세요.**
> 

**JDEX**는 기존의 중앙화된 거래소의 제삼자 개입 없이 **개인 간 금융(P2P) 거래가 가능한 탈중앙화 거래소** 입니다.

누구나 JDEX 웹 사이트에 방문하여 **지갑(Kaikas)**를 연결하고 보유하고 있는 토큰을 다른 사용자에게 **전송**하거나 다른 토큰으로 **교환** 할 수 있습니다.

또, 토큰을 지갑에 가지고만 있는 것이 아닌, **단일 혹은 페어 풀에 예치**하고, 유동성 제공에 대한 **보상(JDEXTOKEN)**을 얻을 수 있습니다.

<br/>

### 💸  **JDEX** 의 대표 기능

- **My Token**
    
    : 소유하고 있는 토큰 목록을 확인하고, 다른 사람에게 원하는 토큰을 **전송** 할 수 있습니다.
    
- **Swap**
    
    : 소유하고 있는 토큰을 다른 토큰들로 **교환**할 수 있습니다.
    
- **Staking**
    
    : 소유하고 있는 토큰을 **풀**에 **예치**하여 **’JDEXTOKEN’을 보상**으로 받을 수 있습니다.
    
<br/>

### ⛓️ 왜 Klaytn 인가 ?

1. **저비용**
    1. 트랜잭션에서 발생하는 **가스비가 1~20원 수준**으로, **이더리움의 1/100**에 해당하는 가스 비용을 필요로 하여 매우 저렴합니다.
2. **높은 확장성(TPS)** 
    1. Klaytn은 실제 **4000TPS**의 트랜잭션 처리량을 가집니다. 이는 **1초에 4000트랜잭션이 한 블록에 들어가는 확장성**으로, 20TPS(Block Interval 15초)의 이더리움과 7TPS(Block Interval 10분)의 비트코인에 비교했을 때 월등히 높은 TPS 입니다.
3. **짧은 완결성(Finality)**
    1. 완결성은 **블록에 담긴 거래가 바뀔 수 없다는 것을 보증하는 시간**으로, 블록 생성 간격(Block Interval) * 검증 횟수로 계산합니다. 클레이튼은 **1초의 완결성**을 가져 초당 한 건의 **합의와 동시에 처리**합니다. 이더리움의 6분, 비트코인의 60분과 비교하여 매우 짧은 완결성을 가집니다.
4. **새로운 시도**
    1. Klaytn에 비하여 ETH는 접할 기회가 많았기 때문에 이번 프로젝트를 통해 **Klaytn Chain을 경험**하고, 배우고 싶었습니다. 

<br/>

### ⛓️ 왜 Klaytn 기반의 DEX인가 ?

1. 기존의 보편화 된 덱스들은 이더리움의 메이저 덱스인 **유니스왑** 혹은 **스시스왑**을 클론 코딩하여 배포하였습니다. **JDEX**는 Klaytn에서 자체적으로 제공하는 **Klaytn Dex Contracts**를 분석하고, 배포하는 과정을 거쳐 KIP 컨트랙트 대신 이더리움의 ERC 컨트랙트를 수정하여 사용한 기존 Klaytn 덱스들과 **차별점**을 두었습니다.
2. **개인 간 금융**(P2P)이 이루어지는 DEX에서 저희가 중요하게 생각한 2가지 **수수료**와 **전송 속도**입니다. 탈중앙화 거래소(DEX)인 만큼 중앙화거래소(은행)과는 다른 장점이 있어야 한다고 생각했고, 수업을 통해 배운 ETH는 비싼 수수료와 느린 전송 속도로 체인으로의 뚜렷한 장점을 찾지 못하였습니다. 그래서 상대적으로 **가스비가 저렴**하고, **속도가 빠른 Klaytn Chain**을 선택하게 되었습니다.

<br/>
<br/>

# 3. 기능별 시연 영상

- **Connect Wallet**
    
    ![wallet](https://user-images.githubusercontent.com/99964401/193564278-4a768ce2-8721-4325-a885-58fc6360881b.gif)
    
    - Kailkas 지갑 연결을 위한 모달 창을 보여줍니다.
- **My Token**
    
    ![Transfer](https://user-images.githubusercontent.com/99964401/193564312-b6082a62-6f87-410c-9212-a340e3b1fbd8.gif)
    
    - **My Token List**
        - 연결된 지갑 보유한 Klay 토큰 및 KIP7 토큰 리스트업 합니다.
    - **Transfer - 토큰 전송**
        - 보유한 토큰을 다른 사람에게 전송할 수 있습니다.
- **Swap**
    
    ![swap](https://user-images.githubusercontent.com/99964401/193564347-a3c9a999-ae98-44e8-8620-414f033e2a05.gif)
    
    - 보유한 Klay / KIP7 토큰을 원하는 다른 KIP7 토큰으로 교환 할 수 있습니다.
- **Staking - 단일 예치**
    - 보유한 토큰을 예치하고, 유동성에 대한 보상(LP Token)을 받습니다.
    - **Single Pool List**
        
        **[ Deposit - 예치 ]**
        
        ![singlepool](https://user-images.githubusercontent.com/99964401/193564394-8be9b6fa-927b-4328-9270-de635503013f.gif)
        
        **[ Withdraw - 출금 ]**
        
        ![singlewithdraw](https://user-images.githubusercontent.com/99964401/193564416-e7297b66-8dd1-4d4f-9808-4d246afd3589.gif)
        
        - 단일 풀 목록이 리스트 업 됩니다.
        - 풀을 선택하여 단일 예치(Deposit)와 출금(Withdraw)가 가능합니다.
   
- **Staking - 페어 예치**
    - 보유한 토큰을 예치하고, 유동성에 대한 보상(LP Token)을 받습니다.
    - **Pair Pool List**
        
        **[ Deposit - 예치 ]**
        
        ![pairpool](https://user-images.githubusercontent.com/99964401/193564985-0b65695a-bd73-4253-ab97-f80208fff057.gif)
        
        **[ Withdraw - 출금 ]**
        
        ![pairwithdraw](https://user-images.githubusercontent.com/99964401/193565016-30878f12-74a4-4c69-98ea-697129a32f14.gif)
        
        - ALL / Klay / KIP 페어 풀 목록이 리스트 업 됩니다.
        - 원하는 페어 풀을 선택하여 토큰 페어 예치(Deposit)와 출금(Withdraw)가 가능합니다.
    - **Create Pool**
        
        ![create](https://user-images.githubusercontent.com/99964401/193565047-24599c7c-2e84-4a2a-b995-0fbd10f6f177.gif)
        
        - 원하는 토큰 페어의 유동성 풀을 생성할 수 있습니다.

<br/>
<br/>

# 4. 관련 문서

## 📋 DB Schema

<img width="613" alt="DB" src="https://user-images.githubusercontent.com/99964401/193568157-2b32a512-8f18-4274-b14f-9d59167e2f0a.png">

<br/>

## 📋 DB Api

| EndPoint | Description | METHOD | Parameters | res |
| --- | --- | --- | --- | --- |
| /mytoken | 모든 토큰 정보 | GET | X | token_address, 
token_name,
token_symbol |
| staking/singlepool | 단일 풀 정보 | GET | X | token_address, 
token_name,
token_symbol |
| staking/klaypool | Klay-KIP7 풀 정보 | GET | X | pair_address,    
pair_name,    
token_address,
pid |
| staking/kip7pool | KIP7-KIP7 풀 정보 | GET | X | pair_address,
pair_name,
tokenA_address,    
tokenB_address,
pid |
| staking/create_klaypool | Klay-KIP7 pair 생성 | POST | token_address,
token_amount | X |
| staking/create_kip7pool | KIP7-KIP7 pair 생성 | POST | tokenA_address,
tokenA_amount,
tokenB_address,
tokenB_amount | X |
| staking/create_singlepool | 단일 풀 생성 | POST | token_address,
token_name,
token_symbol | X |

<br/>

## 📋 Wireframe

![JDEX_Wireframe](https://user-images.githubusercontent.com/99964401/193565105-dad5b57b-f986-43b2-8969-44a5670d7e7e.png)


<br/>

## 📋 Flow Chart

![JDEX Flowchart Final drawio](https://user-images.githubusercontent.com/99964401/193568279-245cb89f-ad5a-4cde-8a1a-3534dadcb98f.png)

<br/>

## 📋 Token Economy

<img width="1709" alt="JDEX_TokenEconomy" src="https://user-images.githubusercontent.com/99964401/193568712-eba90a3c-1c83-4d93-9294-a3795ec1a5b1.png">

**[JDEX의 Token Economy]**

- **개발자, 투자자, 유저**들에게 적절한 양의 **토큰을 분배**하고, **예치(단일, 페어 풀)**에 대한 **보상**으로 **JDX 토큰을 지급** 받아 지속가능한 시스템을 구축하고자 하였습니다.
- 보상으로 주어지는 **JDX 토큰**을 **일정 지분 보유**시 **JDEX의 운영 방향성 및 협의**에 대한 **투표 거버넌스에 참여**할 수 있습니다.


<br/>
<br/>

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
  <img src="https://img.shields.io/badge/Kaikas-F5AE29?style=for-the-badge&logo=Kailkas&logoColor=black">
  <img src="https://img.shields.io/badge/KlaytnIDE-003366?style=for-the-badge&logo=KlaytnIDE&logoColor=white">
  <img src="https://img.shields.io/badge/ganache-A42E2B?style=for-the-badge&logo=ganache&logoColor=white">
  <br>
  
</div>

<br/>
