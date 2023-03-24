function testPostDevice() {
   rm devices.json	
   ../post_device.sh id_03 name_03 key_03  > /dev/null 2>&1
   ../get_json_devices.sh > /dev/null 2>&1
   jq . devices.json | grep id_03 >/dev/null
   assertEquals 0 $?
}

. shunit2
