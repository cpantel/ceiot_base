#!/bin/bash
echo "ingrese su clave"
read CLAVE
if [ $CLAVE == $ENV_CLAVE ]; then
  echo "ok"
else
  echo "fail"
fi

