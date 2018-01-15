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

goog.module('myphysicslab.lab.util.Util');

class Util {
  /** Provides static utility functions.
  @private
  */
  constructor() { throw new Error(); }

  /** Returns the
  * [language independent form](Building.html#languageindependentnames) of the given
  * string by changing to uppercase and replacing spaces and dashes with underscores.
  * @param {string} text
  * @return {string} the text upper-cased and with spaces and dashes replaced by
  *   underscores
  */
  static toName(text) {
    return text.toUpperCase().replace(/[ -]/g, '_');
  };

  /** Returns `true` if the numbers are significantly different to a certain tolerance
  level, adjusting the tolerance for larger numbers.

  For numbers with absolute value smaller than `magnitude` the numbers are compared using
  a fixed tolerance of `magnitude*epsilon`.

  For numbers with absolute value larger than `magnitude`, the tolerance is
  `epsilon` times the larger of the absolute values of the numbers being compared.

  Unless specified, the default for `magnitude` is 1.0 and `epsilon` is 1E-14. These
  settings return `true` if the numbers are significantly different to approximately 14
  decimal digits when their magnitude is near 1.0.

  The goal is to have a test that is immune to the inaccuracy of double arithmetic.
  Doubles have 15 to 17 significant decimal digits of accuracy, so comparing 14
  significant digits should be fairly safe from the inaccuracy in double arithmetic.

  This method takes into account the size of the numbers being compared, so it is
  safer than code such as

      if (Math.abs(a - b) > 1E-16)  // do something

  Doubles have 15 to 17 significant decimal digits of accuracy. When the numbers being
  compared are much bigger in magnitude than 1.0, then this test is too strict -- it
  effectively is comparing to zero, meaning exact equality.

  See [Comparing Floating Point Numbers, 2012
  Edition](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) by Bruce Dawson.

  See [StackOverflow: How dangerous is it to compare floating point values?](http://stackoverflow.com/questions/10334688/how-dangerous-is-it-to-compare-floating-point-values)


  @param {number} arg1  the first number to compare
  @param {number} arg2  the second number to compare
  @param {number=} epsilon the small value used with `magnitude` to calculate
      the tolerance for deciding when the numbers are different, default is 1E-14.
  @param {number=} magnitude the approximate magnitude of the numbers being compared,
      default is 1.0.
  @return {boolean} true if the doubles are different to 14 significant decimal digits
  @throws {!Error} if `magnitude` or `epsilon` is negative or zero
  */
  static veryDifferent(arg1, arg2, epsilon, magnitude) {
    epsilon = epsilon || 1E-14;
    if (epsilon <= 0) {
      throw new Error('epsilon must be positive '+epsilon);
    }
    magnitude = magnitude || 1.0;
    if (magnitude <= 0) {
      throw new Error('magnitude must be positive '+magnitude);
    }
    var maxArg = Math.max(Math.abs(arg1), Math.abs(arg2));
    var max = maxArg > magnitude ? maxArg : magnitude;
    return Math.abs(arg1 - arg2) > max * epsilon;
  };
};


/** Flag indicates when advanced-compile option is being used during compilation
* by Closure Compiler.
* See [Advanced vs. Simple Compile](Building.html#advancedvs.simplecompile).
* See the shell script `compile_js.sh` which sets this flag at compile time.
* @define {boolean}
*/
Util.ADVANCED = false;

/** Date and time when the code was compiled.
* @define {string}
*/
Util.COMPILE_TIME = '00/00/00';

/** Flag indicates whether to include debug code, must be true for assertions
* to work. Can be set as a compiler option, see the shell script `compile_js.sh`.
* See [Customizing The Build Process](Building.html#customizingthebuildprocess).
* @define {boolean}
*/
Util.DEBUG = false;

exports = Util;
