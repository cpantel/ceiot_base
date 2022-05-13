# CEIOT BASE

Código para ejemplo básico de IoT


![](./img/arch.png)

Lo siguiente se puede hacer en cualquier sistema de virtualización por comodidad y prolijidad o directamente en una máquina real.


## Paso 1: VM con virtualbox

  - CPUs    : 1
  - Memoria : 4 GB 
  - Disco   : 40 GB (llega a ocupar casi 20GB)
  - Network : bridge
  - Distro  : Ubuntu Server 20.04.4 LTS

Finalizado el proceso de instalación, quizás con 2GB o incluso 1.5 GB de RAM alcance sin firefox.

### Instalación

    # Bajar el instalador de https://ubuntu.com/download/server.
    # Crear una nueva VM.
    # Parametrizar según los valores previos
    # Al arrancar, va a preguntar de dónde, darle la ruta a la ISO descargada.
    # Si ofrece "Update to the new installer", no, gracias.
    # Varios "Done".
    # Cuando ofrece instalar openssh server, aceptarlo.
    # Si se queda para siempre en "downloading and installing security updates", "cancel update and reboot".
    # "reboot now"
    
### Ajustes

    # Apretar enter, hacer login.
    # firefox opcional, ocupa como 300MB
    sudo apt install xorg openbox firefox git gcc make perl 
    # En el menú de VirtualBox asociado a la instancia actual
    # Devices -> Insert guest additions CD image...
    sudo mount /dev/cdrom /mnt
    sudo /mnt/VBoxLinuxAdditions.run
    # Si dice que no existe /dev/cdrom
    sudo /media/${USER}/VBoxLinuxAdditions.run
    # paciencia...
    # En una terminal
    sudo addgroup "$USER" vboxsf
    sudo addgroup "$USER" dialout
    sudo reboot

### Espacio libre

Por algún motivo que ignoro, la instalación no usa todo el espacio disponible, se corrige en cualquier momento con:

      $ sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
      $ sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv

## Paso 2: API/SPA

### Instalación node + typescript

    curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt install nodejs
    node --version
    #Debe ser 17.x.x, en caso contrario el paso con curl falló
    sudo npm install typescript -g

### Código referencia

    mkdir ~/esp
    cd ~/esp    
    git clone https://github.com/cpantel/ceiot_base.git
    cd ceiot_base/api
    npm install; # express body-parser mongodb-memory-server mongodb pg-mem

### Pruebas

En una terminal servidor API:

    cd ~/esp/ceiot_base/api
    node index.js
    
Esperamos:

    mongo measurement database Up
    sql device database up
    Listening at 8080

En otra terminal, servidor SPA:

    cd ~/esp/ceiot_base/api/spa
    ./rebuild.sh
    
Esperamos:

    Starting compilation in watch mode...
    Found 0 errors. Watching for file changes.
    
Cliente, en otra terminal:

    cd ~/esp/ceiot_base/tools
    ./get_color_devices.sh 14
    
Esperamos:
    
![](./img/API_color.png)


En un navegador, probar las siguientes URLs:




    SPA: http://localhost:8080/index.html -> lista de dispositivos con un botón de refrescar

![](./img/SPA_devices.png)
    
    WEB: http://localhost:8080/web/device -> lista de dispositivos web
    
![](./img/WEB_device.png)
    
    API: http://localhost:8080/device -> lista dispositivos JSON

![](./img/API_device.png)

## Paso 3: Entorno ESP-IDF para ESP32/ESP32s2/ESP32c3

En el último paso, alcanza con elegir sólo las que uno tiene.

    sudo apt install git wget flex bison gperf python3 python3-pip python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0 
    cd ~/esp
    git clone https://github.com/UncleRus/esp-idf-lib.git
    git clone -b v4.4 --recursive https://github.com/espressif/esp-idf.git
    cd ~/esp/esp-idf-lib
    git checkout 0.8.2
    cd ~/esp/esp-idf
    git checkout release/v4.4
    git submodule update --init --recursive; # puede hacer falta
    ./install.sh esp32,esp32s2,esp32c3
    

Las siguientes instrucciones implican que en la terminal actual se ha ejecutado:

    cd ~/esp/esp-idf
    . ./export.sh


### ESP32

Dependiendo del modelo, puede hacer falta oprimir el botón de **RESET** al conectar en **flash** y **monitor**.

#### BMP280
 
    cd ~/esp/ceiot_base/config
    cp config.h.template config.h
    # modificar en config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
    cd ~/esp/ceiot_base/esp32-bmp280
    ../set-wifi.sh
    idf.py set-target esp32
    idf.py build
    idf.py flash
    idf.py monitor

#### DHT11
 
    cd ~/esp/ceiot_base/config
    cp config.h.template config.h
    # modificar en config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
    cd ~/esp/ceiot_base/esp32
    ../set-wifi.sh
    idf.py set-target esp32
    idf.py build
    idf.py flash
    idf.py monitor

### ESP32c3

#### BMP280
 
    cd ~/esp/ceiot_base/config
    cp config.h.template config.h
    # modificar en config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
    cd ~/esp/ceiot_base/esp32c3-bmp280
    idf.py set-target esp32c3
    ../set-wifi.sh
    idf.py build
    idf.py flash
    idf.py monitor

    
### ESP32s2

#### DHT11
 
    cd ~/esp/ceiot_base/config
    cp config.h.template config.h
    # modificar en config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
    cd ~/esp/ceiot_base/esp32s2
    idf.py set-target esp32s2
    ../set-wifi.sh
    idf.py build
    idf.py flash
    idf.py monitor
    
    

[Ejemplo de ESP32 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/02/ejemplo-de-esp32-con-lectura-de-dht11.html)

[Primer contacto con ESP32](https://seguridad-agile.blogspot.com/2022/02/primer-contacto-con-esp32.html)


## Paso 4: (opcional) Entorno ArduinoIDE

### ESP8266

#### DHT11

     # Descargar de https://www.arduino.cc/en/software
     cd ~/esp
     tar -xf ../Downloads/arduino-x.x.xx-linux64.tar.xz
     ./arduino-x.x.xx/arduino
     # File -> preferences -> Additional Boars Manager URLs
     # http://arduino.esp8266.com/stable/package_esp8266com_index.json
     # Tools -> Board -> Board Manager -> search esp8266 -> esp8266 by ESP8266 Community -> install
     # Tools -> Board ->ESP8266 Generic Module
     # Tools -> Manage Libraries -> search dht sensor -> DHT sensor library for ESPx -> install
     # Conectar device
     # Tools -> Port -> /dev/ttyUSB0
     # File -> Open -> ~/esp/ceiot_base/esp8266-arduino/PostHttpClient
     # modificar en ~/esp/ceiot_base/config/config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
     # Sketch -> Upload

[Más detalles en el Plan B](https://seguridad-agile.blogspot.com/2022/03/ejemplo-de-esp8266-con-lectura-de-dht11planB.html)


## Entorno ESP8266_RTOS_SDK para ESP8266

Este entorno no me funcionó y además rompió el de ESP-IDF.

[Ejemplo de ESP8266 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/03/ejemplo-de-esp8266-con-lectura-de-dht11.html)

