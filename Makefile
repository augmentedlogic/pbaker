#
# Makefile
#
# this makefile is only used to make quick and dirty debian packages
# and snapshots

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
	gzip -c --best doc/pbaker.8 > build/usr/share/man/man8/pbaker.8.gz	
	cp debian/control build/DEBIAN
	cp src/pbaker build/usr/bin/
	fakeroot $(PROG) $(FLAGS) $(SOURCE) $(DEBTARGET_all)

clean:
	rm -Rf ./build/
