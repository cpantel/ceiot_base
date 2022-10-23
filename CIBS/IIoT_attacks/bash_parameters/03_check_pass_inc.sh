#!/bin/bash
. ./claves.sh
echo "ingrese su clave"
read CLAVE
if [ $CLAVE == $MEM_CLAVE ]; then
  echo "ok"
else
  echo "fail"
fi

