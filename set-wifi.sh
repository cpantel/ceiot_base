
SSID=$( grep "^#define WIFI_SSID"  ../esp32c3-bmp280/config.h | rev | cut -d'"' -f 2 | rev )
PASSWORD=$( grep "^#define WIFI_PASSWORD"  ../esp32c3-bmp280/config.h | rev | cut -d'"' -f 2 | rev )

sed sdkconfig -i -e 's/CONFIG_EXAMPLE_WIFI_SSID=".*/CONFIG_EXAMPLE_WIFI_SSID="'${SSID}'"/' 
sed sdkconfig -i -e 's/CONFIG_EXAMPLE_WIFI_PASSWORD=".*/CONFIG_EXAMPLE_WIFI_PASSWORD="'${PASSWORD}'"/' 


