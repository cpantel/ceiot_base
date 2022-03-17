# ceiot_base

Código para ejemplo básico de IoT

## VM

    CPUs    : 1
    Memoria : 8 GB
    Disco   : 40 GB (llega a ocupar casi 20GB)
    Network : bridge
    Distro  : Ubuntu Server 20.04.4

Pasos

 - https://ubuntu.com/download/server
 - cuando ofrece instalar openssh server, aceptarlo
 - si se queda para siempre en "downloading and installing security updates", cancelar
 - reboot
 - $ sudo apt install xorg openbox firefox git gcc make perl 
 - Devices -> Insert guest additions CD image...
 - $ sudo mount /dev/cdrom /mnt
 - $ sudo /mnt/VBoxLinuxAdditions.run
 - paciencia...
 - $ sudo addgroup "$USER" vboxsfx
 - $ sudo addgroup "$USER" dialout
 - $ sudo reboot

## Sistema

 - git clone git@github.com:cpantel/ceiot_base.git

### API

node + express + pg-mem + mongodb-memory-server

 - $ curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
 - sudo apt install nodejs
 - cd ceiot/api
 - npm install; // express body-parser mongodb-memory-server mongodb pg-mem


### ESP32/ESP32s2/ESPc3

[Ejemplo de ESP32 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/02/ejemplo-de-esp32-con-lectura-de-dht11.html)


### ESP8266

[Ejemplo de ESP8266 con lectura de DHT11](https://seguridad-agile.blogspot.com/2022/03/ejemplo-de-esp8266-con-lectura-de-dht11.html)

