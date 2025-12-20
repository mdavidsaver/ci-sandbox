#!/usr/bin/env python3

import sys, os

for path, subd, files in os.walk('C:/', topdown=False, onerror=print):
    files = (f.lower() for f in files)
    if 'cdb.exe' in files:
        print('Found:', path, 'cdb.exe')
else:
    print('No CDB')
    sys.exit(1)
