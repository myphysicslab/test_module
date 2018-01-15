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

goog.module('myphysicslab.lab.util.MutableVector');

const GenericVector = goog.require('myphysicslab.lab.util.GenericVector');
const Vector = goog.require('myphysicslab.lab.util.Vector');
const Util = goog.require('myphysicslab.lab.util.Util');

/** Mutable vector defines a point in 2D or 3D and can be altered after creation.
* @implements {GenericVector}
*/
class MutableVector {

/**
* @param {number} x the X value of the Vector
* @param {number} y the Y value of the Vector
* @param {number=} opt_z the Z value of the Vector (optional, zero is default value)
*/
constructor(x, y, opt_z) {
  const z = goog.isNumber(opt_z) ? opt_z : 0;
  /**
  * @type {number}
  * @private
  */
  this.x_ = Util.testNumber(x);
  /**
  * @type {number}
  * @private
  */
  this.y_ = Util.testNumber(y);
  /**
  * @type {number}
  * @private
  */
  this.z_ = Util.testNumber(z);
};

/** @override */
toString() {
  return 'MutableVector{x: '+Util.NF5(this.x_)+', y: '+Util.NF5(this.y_)
      + (this.z_ != 0 ? ', z: '+Util.NF5(this.z_) : '')
      +'}';
};

/** Returns a new MutableVector having the same values as the input GenericVector.
@param {!GenericVector} v vector to copy
@return {!MutableVector} a new MutableVector with the same
    values as the input GenericVector
*/
static clone(v) {
  return new MutableVector(v.getX(), v.getY(), v.getZ());
};

/** Adds the given GenericVector to this MutableVector.
@param {!GenericVector} p vector to add
@return {!MutableVector} this MutableVector for chaining
*/
add(p) {
  this.x_ += p.getX();
  this.y_ += p.getY();
  this.z_ += p.getZ();
  return this;
};

/** Returns true if and only if the other object is a GenericVector with the same
values.
@param {!GenericVector} vector  the object to compare to
@return {boolean}  true iff the other object is a GenericVector with the same values.
*/
equals(vector)  {
  if (goog.isNull(vector))
    return false;
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

exports = MutableVector;
