# Ta-Te-Ti: Un ejemplo de TDD en Express con Mocha

Este repositorio contiene un ejemplo paso a paso para el desarrollo de un servidor de backend basado en NodeJS y Express que sirve un juego de TaTeTi.

## Preparación del Entorno

1. Instalar el generador de proyectos de express ([referencia](https://expressjs.com/es/starter/generator.html))

```
sudo npm install express-generator -g
```

2. Generar el proyecto express

```
express --no-view  --git tateti
```

2. Instalar las herramientas de testing 

```
npm install --save-dev mocha chai nyc chai-http
```

3. Modificar el archivo `package.json` para agregar el comando de pruebas

```
  "scripts": {
    "start": "node ./bin/www",
    "test": "mocha --reporter spec",
    "coverage": "nyc --reporter=html mocha"
  },
```

## Ejecución de las pruebas

```
npm test
