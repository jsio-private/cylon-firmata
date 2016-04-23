/*
 * Cylonjs Adaptor adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var RemoteBoardHost = require('jsio-firmata-remote-board').RemoteBoardHost;
var Cylon = require("cylon");

/**
 * A Firmata adaptor
 *
 * @constructor firmata
 *
 * @param {Object} opts options
 * @param {String} opts.port the serial port to connect to the board over
 */
var Adaptor = module.exports = function Adaptor() {
  Adaptor.__super__.constructor.apply(this, arguments);

  this.board = "";
  this.i2cReady = false;

  if (this.port == null) {
    throw new Error("No port specified for Firmata adaptor. Cannot proceed");
  }
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

/**
 * Connects to the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when connected
 * @return {void}
 */
Adaptor.prototype.connect = function(callback) {
  this.board = new RemoteBoardHost({
    wsPort: 8002,
    serialPort: this.port,
    respond: this.respond.bind(this)
  });

  this.board.connect(function(err) {
    if (err) { return callback(err); }
    this.respond("connect", callback);
  }.bind(this));
};

/**
 * Disconnects from the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {void}
 */
Adaptor.prototype.disconnect = function(callback) {
  this.board.disconnect(callback);
};

/**
 * Reads a value from a digital pin
 *
 * @param {Number} pin which pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Adaptor.prototype.digitalRead = function(pin, callback) {
  this.digitalRead(pin, callback);
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin which pin to write to
 * @param {Number} value the value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.digitalWrite = function(pin, value, callback) {
  this.board.digitalWrite(pin, value, callback);
};

/**
 * Reads a value from an analog pin
 *
 * @param {Number} pin which pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Adaptor.prototype.analogRead = function(pin, callback) {
  this.board.analogRead(pin, callback);
};

/**
 * Writes a value to an analog pin
 *
 * @param {Number} pin which pin to write to
 * @param {Number} value the analog value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.analogWrite = function(pin, value, callback) {
  this.board.analogWrite(pin, value, callback);
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin which pin to write a value to
 * @param {Number} value 0..1 value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.pwmWrite = function(pin, value, callback) {
  this.board.pwmWrite(pin, value, callback);
};

/**
 * Writes a servo value to a pin
 *
 * @param {Number} pin pin to write a value to
 * @param {Number} value servo value to write, from 0..1
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.servoWrite = function(pin, value, callback) {
  this.board.servoWrite(pin, value, callback);
};

/**
 * Writes an I2C value to the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Array} buff buffered data to write
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  this.board.i2cWrite(address, cmd, buff, callback);
};

/**
 * Reads an I2C value from the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Number} length amount of data to read
 * @param {Function} callback function to be invoked when values are read
 * @return {void}
 * @publish
 */
Adaptor.prototype.i2cRead = function(address, cmd, length, callback) {
  this.board.i2cRead(address, cmd, length, callback);
};

Adaptor.prototype.pinMode = function(pin, mode) {
  this.board.pinMode(pin, mode);
};

Adaptor.prototype.i2cConfig = function(delay) {
  this.board.i2cConfig(delay);
};
