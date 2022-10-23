#!/bin/bash
echo "ingrese su clave"
read CLAVE
if [ $CLAVE == "hola" ]; then
  echo "ok"
else
  echo "fail"
fi

