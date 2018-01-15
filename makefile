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

lab_js := $(shell find src/lab -name '*.js')

# Static Pattern Rules:
# We use static pattern rules because otherwise `make` ignores
# prerequisites that don't exist. See
# stackoverflow.com/questions/23964228/make-ignoring-prerequisite-that-doesnt-exist
# Static Pattern Rule is like a Pattern rule, but only applies to an explicit list
# of target files. Example: $(OBJECTS): %.o: %.c.
# This is because `make` regards any file that doesn't appear as a target or goal
# as an intermediate file.

build/test/SingleTest-en.js : build/%-en.js : src/%.js $(lab_js)
	@mkdir -v -p $(dir $@)
	./compile.sh $< $@ true true simple

build/test/SingleTest.html : src/test/SingleTest.html | build/test/SingleTest-en.js
	@mkdir -v -p $(dir $@)
	@$(COPY_CMD) $< $@

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
