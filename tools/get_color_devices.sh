wget -O output.txt "http://localhost:8080/term/device/$1"
echo "RENDER"
cat output.txt
