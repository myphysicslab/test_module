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

goog.module('myphysicslab.lab.util.test.Util_test');
goog.setTestOnly('myphysicslab.lab.util.test.Util_test');

const Util = goog.require('myphysicslab.lab.util.Util');
const jsunit = goog.require('goog.testing.jsunit');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({

testUtil: function() {
  // the default tolerance is 1E-14, so large and small numbers should differ
  // at about the 14th decimal place
  assertTrue(Util.veryDifferent(2E-14, 3.1E-14));
  assertFalse(Util.veryDifferent(2E-14, 2.9E-14));
  assertTrue( Util.veryDifferent(1.12345678901234E5, 1.12345678901236E5));
  assertFalse(Util.veryDifferent(1.12345678901234E5, 1.123456789012349E5));
  // Specify size and tolerance
  assertTrue(Util.veryDifferent(2E-10, 3.1E-10, 1E-10));
  assertFalse(Util.veryDifferent(2E-10, 2.9E-10, 1E-10));
  assertTrue( Util.veryDifferent(1.123456789E5, 1.123456790E5, 1E-10, 1E6));
  assertFalse(Util.veryDifferent(1.123456789E5, 1.1234567899E5, 1E-10, 1E6));
  // two small numbers that are different
  var small1 = 1.2345678969481254e-8;
  var small2 = 1.234567893829028e-8;
  assertFalse(Util.veryDifferent(small1, small2));
  assertFalse(Util.veryDifferent(small1, small2, 1e-8, 1e-8));
  assertTrue(Util.veryDifferent(small1, small2, 1e-10, 1e-8));
  assertTrue(Util.veryDifferent(small1, small2, undefined, 1e-8));

  assertEquals('FOO', Util.toName('foo'));
  assertEquals('FOO2', Util.toName('foo2'));
  assertEquals('FOO_BAR', Util.toName('foo bar'));
  assertEquals('FOO_BAR', Util.toName('foo-bar'));
  assertEquals('FOO_BAR', Util.toName('FOO BAR'));
  assertEquals('FOO_BAR', Util.toName('FOO-BAR'));
  assertEquals('FOO_BAR', Util.toName('FOO_BAR'));
}

});

class Util_test {}

exports = Util_test;
