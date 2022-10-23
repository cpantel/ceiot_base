echo "Check results at http://localhost:8080/web/device"
echo 

./post_device.sh 666 '<script>alert("xss");</script>' 234234
