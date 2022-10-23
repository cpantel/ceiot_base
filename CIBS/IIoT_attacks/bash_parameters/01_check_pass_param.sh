#!/bin/bash
echo "ingrese su clave"
read CLAVE
if [ $CLAVE == $1 ]; then
  echo "ok"
else
  echo "fail"
fi

