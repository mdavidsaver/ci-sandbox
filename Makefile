
all:
	echo AAA
	$(MAKE) -f Makefile foo
	echo ZZZ

foo:
	echo BBB
