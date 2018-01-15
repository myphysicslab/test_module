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

goog.provide('myphysicslab.lab.util.test.Vector_test');

goog.require('myphysicslab.lab.util.MutableVector');
goog.require('myphysicslab.lab.util.Vector');
goog.require('goog.testing.jsunit');

var testVector = function() {
  var MutableVector = goog.module.get('myphysicslab.lab.util.MutableVector');
  var Vector = goog.module.get('myphysicslab.lab.util.Vector');
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
};
goog.exportProperty(window, 'testVector', testVector);
