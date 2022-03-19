# ceiot_base

Código para ejemplo básico de IoT

## VM

  - CPUs    : 1
  - Memoria : 8 GB
  - Disco   : 40 GB (llega a ocupar casi 20GB)
  - Network : bridge
  - Distro  : Ubuntu Server 20.04.4

Pasos

    # https://ubuntu.com/download/server
    # cuando ofrece instalar openssh server, aceptarlo
    # si se queda para siempre en "downloading and installing security updates", cancelar
    # reboot
    sudo apt install xorg openbox firefox git gcc make perl 
    # Devices -> Insert guest additions CD image...
    sudo mount /dev/cdrom /mnt
    sudo /mnt/VBoxLinuxAdditions.run
    # paciencia...
    sudo addgroup "$USER" vboxsfx
    sudo addgroup "$USER" dialout
    sudo reboot

## API/SPA

Instalación node + express + pg-mem + mongodb-memory-server y código referencia.

    mkdir ~/esp
    cd ~/esp
    git clone git@github.com:cpantel/ceiot_base.git
    curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt install nodejs
    sudo npm install typescript -g
    cd ceiot_base/api
    npm install; # express body-parser mongodb-memory-server mongodb pg-mem

### Prueba

En una terminal servidor API

    cd ~/esp/ceiot_base/api
    node index.js
    
Esperamos

    mongo measurement database Up
    sql device database up
    Listening at 8080

En otra terminal, servidor SPA

    cd ~/esp/ceiot_base/api/spa
    ./rebuild.sh
    
Esperamos 

    Starting compilation in watch mode...
    Found 0 errors. Watching for file changes.
    
Cliente, en otra terminal

    cd ~/esp/ceiot_base/tools
    ./get_color_devices.sh 
    
Esperamos

    RENDER
    Device name    ESP32
           id          1 
           key    123456

En un navegador, probar las siguientes URLs:

    SPA: http://localhost:8080/index.html -> lista de dispositivos con un botón de refrescar
    
    WEB: http://localhost:8080/web/device -> lista de dispositivos web
    
    API: http://localhost:8080/device -> lista dispositivos JSON

## Entorno ESP-IDF para ESP32/ESP32s2/ESPc3

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

### Prueba
 
    cd ~/esp/ceiot_base/config
    cp config.h.tmplate config.h
    # modificar en config.h la IP del servidor, las credenciales de WiFi y DEVICE_ID.
    cd ~/esp/ceiot_base/esp32
    . ../../esp-idf/export.sh
    ../set-wifi.sh
    idf.py set-target esp32
    idf.py build
    idf.py flash
    idf.py monitor
    
Dependiendo del modelo, puede hacer falta oprimir el botón de **RESET** al conectar en **flash** y **monitor**.
    
    


[Ejemplo de ESP32 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/02/ejemplo-de-esp32-con-lectura-de-dht11.html)
[Primer contacto con ESP32](https://seguridad-agile.blogspot.com/2022/02/primer-contacto-con-esp32.html)


### Entorno ArduinoIDE para ESP8266


### Entorno ESP8266_RTOS_SDK para ESP8266

Este entorno no me funcionó y además rompió el de ESP-IDF

[Ejemplo de ESP8266 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/03/ejemplo-de-esp8266-con-lectura-de-dht11.html)

