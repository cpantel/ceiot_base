# Ejemplo CSRF

Agregar a /etc/hosts

```
127.1.0.1 good
127.1.0.2 evil
```

## Para cada ejemplo

En una terminal:

```
cd good
npm install
node index.js
```

En otra terminal:

```
cd evil
npm install
node index.js
```

Para usar urlencode:


```
sudo apt install gridsite-clients
```

Al menos para csrf hace falta un firefox viejo, por ejemplo:

```
wget https://ftp.mozilla.org/pub/firefox/releases/52.0.1/linux-x86_64/en-US/firefox-52.0.1.tar.bz2
tar -xf firefox-52.0.1.tar.bz2
./firefox/firefox -no-remote -ProfileManager
```
