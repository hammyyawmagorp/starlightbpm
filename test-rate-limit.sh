#!/bin/bash

for i in {1..25}
do
  echo "Request $i:"
  curl -X POST http://localhost:3000/api/calculate-estimate \
    -H "Content-Type: application/json" \
    -d '{"windowCount": 10, "storyType": "one", "cleaningType": "full"}' | cat
  echo -e "\n"
  sleep 0.1
done 