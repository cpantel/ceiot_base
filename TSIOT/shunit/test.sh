function testLogin() {
   EXPECTED_HTTPCODE='200'
   EXPECTED_JSONMSG='"login ok"'
   OUTPUT=$( wget -Sq -O- --method=POST --header='Origin: http://www.smauec.net' --header='Content-Type: application/json' --body-data='{"username":"admin","password":"admin"}' http://api-users.smauec.net/api/auth/signin 2>&1)
   RESULT_HTTPCODE=$( echo "$OUTPUT" | head -1 | grep HTTP | cut -d" " -f 4 )
   RESULT_JSONMSG=$(echo "$OUTPUT" | tail -1 | jq .message )

   assertEquals "Bad http response code" "$EXPECTED_HTTPCODE" "$RESULT_HTTPCODE"
   assertEquals "Bad json message" "$EXPECTED_JSONMSG" "$RESULT_JSONMSG"
}

function testListUsers() {
   EXPECTED_HTTPCODE='200'
   EXPECTED_JSONMSG='"users list"'
   TOKEN=$( wget -Sq -O- --method=POST --header='Origin: http://www.smauec.net' --header='Content-Type: application/json' --body-data='{"username":"admin","password":"admin"}' http://api-users.smauec.net/api/auth/signin 2>&1 | tail -1 | jq .result.accessToken | cut -b 2- | rev | cut -b2- | rev)
   OUTPUT=$(wget -Sq -O- --header='Origin: http://www.smauec.net' --header="x-access-token:$TOKEN" http://api-users.smauec.net/api/users/ 2>&1)
   RESULT_HTTPCODE=$( echo "$OUTPUT" | head -1 | grep HTTP | cut -d" " -f 4 )
   RESULT_JSONMSG=$( echo "$OUTPUT" | tail -1 | jq .message )

   assertEquals "Bad http response code" "$EXPECTED_HTTPCODE" "$RESULT_HTTPCODE"
   assertEquals "Bad json message" "$EXPECTED_JSONMSG" "$RESULT_JSONMSG"
}

. shunit2
