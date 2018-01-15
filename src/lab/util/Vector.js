// Copyright 2016 Erik Neumann.  All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('myphysicslab.lab.util.Vector');

const GenericVector = goog.require('myphysicslab.lab.util.GenericVector');
const Util = goog.require('myphysicslab.lab.util.Util');

/** An immutable vector in 3D space; after creation it cannot be altered.
* @implements {GenericVector}
*/
class Vector {

/**
* @param {number} x the X value of the Vector
* @param {number} y the Y value of the Vector
* @param {number=} opt_z the Z value of the Vector (optional, zero is default value)
*/
constructor(x, y, opt_z) {
  const z = goog.isNumber(opt_z) ? opt_z : 0;
  /**
  * @const
  * @type {number}
  * @private
  */
  this.x_ = Util.testNumber(x);
  /**
  * @const
  * @type {number}
  * @private
  */
  this.y_ = Util.testNumber(y);
  /**
  * @const
  * @type {number}
  * @private
  */
  this.z_ = Util.testNumber(z);
};

/** @override */
toString() {
  return 'Vector{x: '+Util.NF5(this.x_)+', y: '+Util.NF5(this.y_)
      + (this.z_ != 0 ? ', z: '+Util.NF5(this.z_) : '')
      +'}';
};

/** Returns sum of this Vector and given GenericVector.
@param {!GenericVector} vector the Vector to add
@return {!Vector} sum of this Vector and given Vector
*/
add(vector) {
  return new Vector(this.x_ + vector.getX(),
      this.y_ + vector.getY(), this.z_ + vector.getZ());
};

/** Returns an immutable Vector having the same values as the input GenericVector.
If the input vector is an immutable Vector, returns that same Vector.
@param {!GenericVector} vector the GenericVector to copy
@return {!Vector} an immutable Vector with the same values as the input GenericVector
*/
static clone(vector) {
  if (vector instanceof Vector) {
    return vector;
  } else {
    return new Vector(vector.getX(), vector.getY(), vector.getZ());
  }
};

/**  Returns true iff the other object is a GenericVector with the same values.
@param {!GenericVector} vector  the object to compare to
@return {boolean}  true iff the other object is a GenericVector with the same values.
*/
equals(vector)  {
  if (goog.isNull(vector)) {
    return false;
  }
  return vector.getX() === this.x_ &&
         vector.getY() === this.y_ &&
         vector.getZ() === this.z_;
};

/** @override */
getX() {
  return this.x_;
};

/** @override */
getY() {
  return this.y_;
};

/** @override */
getZ() {
  return this.z_;
};

/** Returns length of this Vector.  Note this is computationally expensive as it
involves taking a square root.
@return {number} length of this Vector
*/
length() {
  return Math.sqrt(this.lengthSquared());
};

/** Returns length squared of this Vector.  Computationally cheap because it only
uses multiplication, no square root.
@return {number} length squared of this Vector
*/
lengthSquared() {
  if (this.z_ === 0.0) {
    return this.x_ * this.x_ + this.y_ * this.y_;
  } else {
    return this.x_ * this.x_ + this.y_ * this.y_ + this.z_ * this.z_;
  }
};

}

exports = Vector;
