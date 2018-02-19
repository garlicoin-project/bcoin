/*!
 * garlicoin.js - proof of work functions for garlicoin
 */
const garlicoinhash = require('garlicoinhash/build/Release/garlicoinhash');
// const scrypt = require('./scrypt').derive;

/**
 * Calculates a ScryptN hash using the garlicoinhash module.
 * @alias module:crypto/garlicoinpow.scryptn
 * @param {Buffer} data data
 * @returns {Buffer} buf
 */
function scryptn(data) {
    return garlicoinhash.SumScryptN(data);
}

/**
 * Calculates a Allium hash using the garlicoinhash module.
 * @alias module:crypto/garlicoinpow.scryptn
 * @param {Buffer} data data
 * @returns {Buffer} buf
 */
function allium(data) {
    return garlicoinhash.SumAllium(data);
}

/**
 * Calculates proof-of-work using the correct algorithm based on a timestamp.
 * @alias module:crypto/garlicoinpow.pow
 * @param {Buffer} data data
 * @param {Number} time time
 * @returns {Buffer} buf
 */
function pow(data, time) {
  if (!time || time >= 1518816555) {
    return allium(data);
  }
  return scryptn(data, data, 11, 1, 1, 32);
}

exports.allium = allium;
exports.scryptn = scryptn;
exports.pow = pow;
