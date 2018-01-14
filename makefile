singletest : build/test/SingleTest.html

CLOSURE_COMPILER := ../closure-compiler/target/closure-compiler-1.0-SNAPSHOT.jar
export CLOSURE_COMPILER

# Detect which operating system we are running under
# From: https://stackoverflow.com/questions/714100/os-detecting-makefile
ifeq ($(OS),Windows_NT)
    detected_OS := Windows
else
    detected_OS := $(shell uname -s)
endif

# Different copy command for different operating systems
# For MacOS (Darwin) we want -X to not copy extended attributes
COPY_CMD := cp -va
ifeq ($(detected_OS),Darwin)
    COPY_CMD := cp -vaX
endif

build/test/SingleTest-en.js : src/test/SingleTest.js
	@mkdir -v -p $(dir $@)
	./compile.sh $< $@ true true simple

build/test/SingleTest.html : src/test/SingleTest.html build/test/SingleTest-en.js
	@mkdir -v -p $(dir $@)
	@$(COPY_CMD) $< $@
