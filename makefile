# set the default target here.  Prerequisites are given later on.
all:

singletest : build/test/SingleTest.html

singletest_debug: debug/test/SingleTest_DEBUG.html

unittest: build/test/UnitTest.html

CLOSURE_COMPILER := ../closure-compiler/target/closure-compiler-1.0-SNAPSHOT.jar
export CLOSURE_COMPILER

# myConfig.mk defines variables such as BUILD_DIR, COMPILE_LEVEL, etc.
# You can use sampleConfig.mk as a model when creating your own custom myConfig.mk.
include myConfig.mk

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

lab_js := $(shell find src/lab -name '*.js')

# Static Pattern Rules:
# We use static pattern rules because otherwise `make` ignores
# prerequisites that don't exist. See
# stackoverflow.com/questions/23964228/make-ignoring-prerequisite-that-doesnt-exist
# Static Pattern Rule is like a Pattern rule, but only applies to an explicit list
# of target files. Example: $(OBJECTS): %.o: %.c.
# This is because `make` regards any file that doesn't appear as a target or goal
# as an intermediate file.

src_js := $(shell find src -name '*.js')
debug/deps.js : $(src_js)
	@mkdir -v -p $(dir $@)
	python ./closure-library/closure/bin/build/depswriter.py \
	--root_with_prefix="src ../../../src" > $@

apps_js_en := build/test/UnitTest-en.js build/test/SingleTest-en.js
$(apps_js_en) : build/%-en.js : src/%.js $(lab_js)
	@mkdir -v -p $(dir $@)
	./compile.sh $< $@ true true simple

build/test/SingleTest.html : src/test/SingleTest.html | build/test/SingleTest-en.js
	@mkdir -v -p $(dir $@)
	@$(COPY_CMD) $< $@

debug/test/SingleTest_DEBUG.html : src/test/SingleTest_DEBUG.html | debug/deps.js
	@mkdir -v -p $(dir $@)
	@$(COPY_CMD) $< $@

build/test/UnitTest.html : src/test/UnitTest.html | build/test/UnitTest-en.js
	@mkdir -v -p $(dir $@)
	@$(COPY_CMD) $< $@

all: singletest unittest singletest_debug

clean:
	rm -rfv build

# PHONY means "don't bother trying to make an actual file with this name"
# PHONY also means "always out of date if it has no prerequistes"
# PHONY also prevents implicit rules from trying to build these.
.PHONY: clean

# If .DELETE_ON_ERROR is mentioned as a target anywhere in the makefile, then make will
# delete the target of a rule if it has changed and its recipe exits with a nonzero exit
# status.
.DELETE_ON_ERROR:
