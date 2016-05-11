# Mirar Para Cuidar - Tests
Tests para validar la API del TP 1er semestre 2016 de Arq2 de la UNQ - Mirar para cuidar

## Tecnologías utilizadas:
* ECMAScript 6 como lenguaje de programación.
* [Node.js](https://nodejs.org/en/) como ambiente de ejecución.
* [Babel](https://babeljs.io) como compilador
  (para ES6 y otros [chiches](https://babeljs.io/docs/plugins/preset-stage-0/))
* [npm](https://www.npmjs.com/) como package manager (y scripting engine... etc)
* [Mocka](https://mochajs.org/) como test framework, con algunos agregados:
  * [SuperTest](https://github.com/visionmedia/supertest)
  * [Should.js](https://shouldjs.github.io/)
  * [should-http](https://www.npmjs.com/package/should-http)


# Instalación
## Prerrequisitos
Para poder correr el proyecto se necesita tener instalado nodejs. Está probado con node 4.3. Para instalarlo podemos hacer:

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Otras opciones de instalación pueden encontrar en https://nodejs.org/en/download/package-manager/

## Download
```
git clone git@github.com:npasserini/mirarParaCuidar-tests.git
cd mirarParaCuidar-tests
npm install
```

# Correr los Tests
## Configuración
Modificar el archivo `config.json` para que la url apunte al servidor que desean testear. Ejemplo:
```
{
  "url": "http://localhost:9200"
}
```

Esta configuración se puede overridear desde la línea de comando (ver próxima sección).

## Ejecutar!
Tener corriendo el servidor con la API y luego ejecutar:
```
npm test
```

Para seleccionar una dirección alternativa a la que está configurada en config.json, se debe setear la variable de entorno URL. Por ejemplo:

```
export URL=localhost:8080 && npm test
```

# Cómo contribuir
1. Faltan aún muchos tests por hacer, así que cualquier aporte es bienvenido. Sólo es necesario clonar el repo y enviar un pull request.
2. Si hay diferencias en cuanto a lo que ustedes creen que debería ser la API no dejen de comunicármelo o incluso levantar un issue para que lo discutamos ahí entre todos.
3. Deberíamos armar una documentación de la API, posiblemente basada en blueprint.
4. Extenderlo para hacer pruebas de performance.
