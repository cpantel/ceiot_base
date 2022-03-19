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
    # sudo addgroup "$USER" vboxsfx
    # sudo addgroup "$USER" dialout
    # sudo reboot

## Sistema

    # git clone git@github.com:cpantel/ceiot_base.git

### API

Instalación node + express + pg-mem + mongodb-memory-server y código referencia

    curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt install nodejs
    cd ceiot_base/api
    npm install; # express body-parser mongodb-memory-server mongodb pg-mem

#### Prueba

    node index.js
    
Esperamos

    mongo measurement database Up
    sql device database up
    Listening at 8080

Cliente, en otra terminal en ceiot_base/tools

    ./get_color_devices.sh 
    
Esperamos

    RENDER
    Device name    ESP32
           id          1 
           key    123456



### ESP32/ESP32s2/ESPc3

[Ejemplo de ESP32 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/02/ejemplo-de-esp32-con-lectura-de-dht11.html)


### ESP8266

[Ejemplo de ESP8266 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/03/ejemplo-de-esp8266-con-lectura-de-dht11.html)

