#
# Makefile
#
# this makefile is only used to make debian packages
# and tar.bz2 snapshots

VERSION=0.2
PACKAGE_VERSION=1
PROG=dpkg-deb
SOURCE=./build
FLAGS=--build
DEBTARGET_all=pbaker_$(VERSION)-$(PACKAGE_VERSION)_all.deb
TARGET=pbaker-$(VERSION)

debian_package:
	mkdir -p build/DEBIAN
	mkdir -p build/usr/bin
	mkdir -p build/usr/share/doc/pbaker
	mkdir -p build/usr/share/man/man8/
	cp debian/copyright build/usr/share/doc/pbaker/copyright
	gzip -c --best doc/pbaker.8 > build/usr/share/man/man8/pbaker.8.gz	
	cp debian/control build/DEBIAN
	cp src/pbaker build/usr/bin/
	fakeroot $(PROG) $(FLAGS) $(SOURCE) $(DEBTARGET_all)

snapshot:
	git archive master | bzip2 > pbaker-$(VERSION)-$(PACKAGE_VERSION).tar.bz2

clean:
	rm -Rf ./build/
