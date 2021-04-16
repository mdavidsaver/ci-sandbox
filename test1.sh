#!/bin/sh
set -e

echo "Testing"

echo "::warning file=blah.h,line=42,col=0::Hello World"
echo "::warning file=blah.h,line=43::Testing"
echo "::error file=blah.h,line=44,col=0::oops"

exit 0
