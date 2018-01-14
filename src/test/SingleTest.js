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

goog.provide('myphysicslab.test.SingleTest');

goog.require('myphysicslab.lab.util.Util');

goog.scope(function() {

var Util = myphysicslab.lab.util.Util;

/** Runs a simple test.

* @constructor
* @final
* @struct
* @private
*/
myphysicslab.test.SingleTest = function() {
  throw new Error();
};
var SingleTest = myphysicslab.test.SingleTest;

/**  Output will be written to this Element.  If this is null then
* output goes to window.console.
* @type {?Element}
*/
SingleTest.output = document.getElementById('test_results');

/**  Prints a line of test results to the HTML page.
* @param {string} s the string to print
*/
SingleTest.myPrintln = function(s) {
  console.log(s);
  if (SingleTest.output != null) {
    SingleTest.output.innerHTML += s + '<br>';
    var docElement = /** @type {!HTMLElement}*/(document.documentElement);
    var documentHeight = docElement.offsetHeight;
    var viewportHeight = window.innerHeight;
    window.scrollTo(0, documentHeight - viewportHeight);
  }
};

/**
* @return {undefined}
* @export
*/
SingleTest.runTests = function() {
  SingleTest.myPrintln('veryDifferent(2E-14, 3.1E-14) = '+Util.veryDifferent(2E-14, 3.1E-14));
  SingleTest.myPrintln('veryDifferent(2E-14, 2.9E-14) = '+Util.veryDifferent(2E-14, 2.9E-14));
  SingleTest.myPrintln('Util.toName("foo bar") = '+Util.toName('foo bar'));
};

}); // goog.scope
