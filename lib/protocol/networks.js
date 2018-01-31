/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('../crypto/bn');

const network = exports;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'dnsseed.rshaw.space' // Ryan Shaw
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xdbb6c6d2;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 42069;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  0: '2ada80bf415a89358d697569c96eb98cdbf4c3b8878ac5722c01284492e27228',
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 0;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 210000;

/**
 * Genesis block header.
 * @const {NakedBlock}
 */

main.genesis = {
  version: 1,
  hash: '2ada80bf415a89358d697569c96eb98cdbf4c3b8878ac5722c01284492e27228',
  prevBlock: '5f32b33db6dcab182dfad55b3d04b2978c1598cf82519835e000dd77e37f3aa8',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1515925970,
  bits: 504365040,
  nonce: 811793,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00a83a7fe377dd00e035985182cf98158c97b2043d5bd5fa2d18abdcb63db3325fd23'
  + '15b5af0ff0f1e11630c00010100000001000000000000000000000000000000000000'
  + '0000000000000000000000000000ffffffff6304ffff001d01044c5a4966207468697'
  + '320706f73742067657473203330303030207570766f74657320492077696c6c206d61'
  + '6b652061206761726c69632062726561642063727970746f63757272656e637920636'
  + '16c6c6564206761726c69636f696effffffff0100f2052a010000004341696984710f'
  + 'a689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08'
  + 'dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac00000000';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 504365055,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000601172be4',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 60 * 60, // now irrelevant due to Dark Gravity Wave

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 40,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 0,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: '2ada80bf415a89358d697569c96eb98cdbf4c3b8878ac5722c01284492e27228',

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 0,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: '2ada80bf415a89358d697569c96eb98cdbf4c3b8878ac5722c01284492e27228',

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 0,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: '2ada80bf415a89358d697569c96eb98cdbf4c3b8878ac5722c01284492e27228',

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

// TODO
main.bip30 = {
  // 91842: 'eccae000e3c8e4e093936360431f3b7603c563c1ff6181390a4d0a0000000000',
  // 91880: '21d77ccb4c08386a04ac0196ae10f6a1d2c2a377558ca190f143070000000000'
};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 6048; // 95% of 8064

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 8064; // nPowTargetTimespan / nPowTargetSpacing * 4

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1483228800, // January 1, 2017
    timeout: 1517356801, // January 31st, 2018
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1483228800, // January 1, 2017
    timeout: 1517356801, //  January 31st, 2018
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0xb0,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x26,
  scripthash: 0x32,
  witnesspubkeyhash: 0x26,
  witnessscripthash: 0x32,
  bech32: 'bc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 42068;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 100000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'dnsseed-test.rshaw.space' // Ryan Shaw
];

testnet.magic = 0xf1c8d2fd;

testnet.port = 42075;

testnet.checkpointMap = {
  0: 'b25004ec2dc27689999f9ee14856ee0464d7f73f3fae3cf43c1d40f89c141aea'
};

testnet.lastCheckpoint = 0;

testnet.halvingInterval = 690000;

testnet.genesis = {
  version: 1,
  hash: 'b25004ec2dc27689999f9ee14856ee0464d7f73f3fae3cf43c1d40f89c141aea',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '5f32b33db6dcab182dfad55b3d04b2978c1598cf82519835e000dd77e37f3aa8',
  time: 1516729643,
  bits: 504365040,
  nonce: 1047651,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00a83a7fe377dd00e035985182cf98158c97b2043d5bd5fa2d18abdcb63db3325f2b7'
  + '5675af0ff0f1e63fc0f00010100000001000000000000000000000000000000000000'
  + '0000000000000000000000000000ffffffff6304ffff001d01044c5a4966207468697'
  + '320706f73742067657473203330303030207570766f74657320492077696c6c206d61'
  + '6b652061206761726c69632062726561642063727970746f63757272656e637920636'
  + '16c6c6564206761726c69636f696effffffff0100f2052a010000004341696984710f'
  + 'a689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08'
  + 'dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac00000000';

testnet.pow = {
  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 504365055,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 60 * 60,
  targetSpacing: 40,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 76,
  bip34hash: '8075c771ed8b495ffd943980a95f702ab34fce3c8c54e379548bda33cc8c0573',
  bip65height: 76,
  bip65hash: '8075c771ed8b495ffd943980a95f702ab34fce3c8c54e379548bda33cc8c0573',
  bip66height: 76,
  bip66hash: '8075c771ed8b495ffd943980a95f702ab34fce3c8c54e379548bda33cc8c0573',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1483228800, // January 1, 2017
    timeout: 1517356801, // January 31st, 2018
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1483228800, // January 1, 2017
    timeout: 1517356801, // January 31st, 2018
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  witnesspubkeyhash: 0x03,
  witnessscripthash: 0x28,
  bech32: 'tb'
};

testnet.requireStandard = false;

testnet.rpcPort = 42075;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.magic = 0xdab5bffa;

regtest.port = 48444;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: '06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1296688602,
  bits: 545259519,
  nonce: 2,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0x5a,
  xpubkey: 0xeab4fa05,
  xprivkey: 0xeab404c7,
  xpubkey58: 'rpub',
  xprivkey58: 'rprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x3c,
  scripthash: 0x26,
  witnesspubkeyhash: 0x7a,
  witnessscripthash: 0x14,
  bech32: 'rb'
};

regtest.requireStandard = false;

regtest.rpcPort = 48332;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (btcd)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip65height: 0,
  bip65hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip66height: 0,
  bip66hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  witnesspubkeyhash: 0x19,
  witnessscripthash: 0x28,
  bech32: 'sc'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;
