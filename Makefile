#
# Makefile
#
# this makefile is only used to make quick and dirty debian packages
# and snapshots

VERSION=0.1
PACKAGE_VERSION=1
PROG=dpkg-deb
SOURCE=./build
FLAGS=--build
DEBTARGET_all=pbaker_$(VERSION)-$(PACKAGE_VERSION)_all.deb
TARGET=pbaker-$(VERSION)

debian_package:
	mkdir -p build/DEBIAN
	mkdir -p build/usr/bin
	cp debian/control build/DEBIAN
	cp src/pbaker build/usr/bin/
	fakeroot $(PROG) $(FLAGS) $(SOURCE) $(DEBTARGET_all)

