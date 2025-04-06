#!/bin/bash

while true; do
	RANDOM_ID=$((1 + RANDOM % 25))
	TEMP=$((RANDOM % 100))
	HUM=$((RANDOM % 100))
		
	curl -X POST http://localhost:8080/measurement \
	     -d "id=$RANDOM_ID&t=$TEMP&h=$HUM"
	echo ""
	     
sleep 1
done
