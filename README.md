test_module README
===================
test_module contains simple example classes to explore using modules with
[Closure Compiler](https://github.com/google/closure-compiler) and
[Closure Library](https://github.com/google/closure-library).

Author and License
------------------
test_module is provided as open source software under the
[Apache 2.0 License](http://www.apache.org/licenses/). See the accompanying
file named `LICENSE`. The author is Erik Neumann <erikn@myphysicslab.com>.

Source code is available at <https://github.com/myphysicslab/test_module>.


Building
--------

To build from source code the required tools are

+ [Java 7 or higher](http://www.java.com)

+ [GNU Make](https://www.gnu.org/software/make/)

+ [Closure Compiler](https://github.com/google/closure-compiler)

+ [Closure Library](https://github.com/google/closure-library) is a separate
    download from Closure Compiler. It is a collection of JavaScript source
    code.

Once the prerequisites are on your system, follow these steps:

1. Download the test_module source code from
    <https://github.com/myphysicslab/test_module>.

2. Copy the file `sampleConfig.mk` to `myConfig.mk` and edit `myConfig.mk` to
    specify location of Closure Compiler in the `CLOSURE_COMPILER` variable.

3. Create a **symbolic link** to `closure-library` in the directory that has
    the `makefile`. Example of how to create the symbolic link:

        $ ln -s ../closure-library/ closure-library

4. Execute `make` at the command line.

5.  Open the file `/build/test/SingleTest-en.html` with a browser. This has
    links to all the files that were built.

