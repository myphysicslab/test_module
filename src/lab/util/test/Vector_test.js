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

goog.module('myphysicslab.lab.util.test.Vector_test');
goog.setTestOnly('myphysicslab.lab.util.test.Vector_test');

const Vector = goog.require('myphysicslab.lab.util.Vector');
const MutableVector = goog.require('myphysicslab.lab.util.MutableVector');
const jsunit = goog.require('goog.testing.jsunit');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({

testVector: function() {
  var v1 = new Vector(2.1, 3.2);
  assertEquals(2.1, v1.getX());
  assertEquals(3.2, v1.getY());
  var v2 = new Vector(1, 1);
  assertRoughlyEquals(Math.sqrt(2), v2.length(), 1E-15);
  assertEquals(1.0, v2.getX());
  assertEquals(1.0, v2.getY());
  assertTrue(v2.equals(new MutableVector(1, 1)));
  var v3 = v1.add(v2);
  assertEquals(3.1, v3.getX());
  assertEquals(4.2, v3.getY());
}

});

class Vector_test {}

exports = Vector_test;
