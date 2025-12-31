
import sys
import logging
import winreg

todo = [key.split('\\') for key in sys.argv[1:]]

access = winreg.KEY_READ|winreg.KEY_WRITE|winreg.KEY_WOW64_64KEY

while len(todo):
    kl = todo.pop(0)

    kname = '\\'.join(kl)
    try:
        with winreg.OpenKeyEx(winreg.HKEY_LOCAL_MACHINE, kname, 0, access) as key:
            nsub, nval, lastmod = winreg.QueryInfoKey(key)

            for i in range(nval):
                vname, vobj, vtype = winreg.EnumValue(key, i)
                print(kname, vname, vtype, vobj)

            for i in range(nsub):
                sname = winreg.EnumKey(key, i)
                todo.append(kl + [sname])

    except:
        logging.exception(kname)
