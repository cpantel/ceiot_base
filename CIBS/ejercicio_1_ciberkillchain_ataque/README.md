# Ejercicio CiberKillChain - Ataque


## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

## Instrucciones

### Crear un nuevo documento en esta carpeta con el nombre entrega.md y las siguientes secciones:

 * (# Alumno) Alumno
 * (# Sistema víctima) Muy breve descripción del trabajo práctico con link si hay
 * (# Objetivo)
 * (# Resolución)
 * (## Reconnaissance)
 * (## Weaponization)
 * etc...

## Alguna indicaciones útiles

Debe haber un objetivo para el ataque, algunas ideas inspiradoras:

 * Obtener información con algún tipo de valor.
 * Alguna variante extorsiva de ransomware.
 * Usar de plataforma para atacar a otros, ya sea por ancho de banda, anonimización o como desplazamiento lateral hacia un objetivo más interesante.
 * Usar la plataforma para extraerle valor como criptominado o almacenamiento de información ilegal.
 * Sabotear la plataforma a favor de la competencia, tipo stuxnet.

El escenario debe asumir el sistema ya funcionando en el futuro.

Debe ser en primera persona, es el punto de vista del atacante.

Para cada etapa, si hay varias medidas posibles, ordenar dejando para lo último lo que se va a hacer en el siguiente paso.

Es bien visto relacionar los recursos de ataque con las técnicas de ATT&CK o https://cwe.mitre.org/

No vale colapsar pasos. Puede haber un paso para el cual no corresponda nada. El ataque puede ser en etapas, siendo la acción sobre los objetivos un segundo ciclo embebido, por ejemplo cuando se obtienen credenciales y al acceder adentro se hace un nuevo ataque contra el objetivo final.


Es recomendable hacer dos o tres pasadas, en la primera la idea, en las siguientes refinamientos especificando las técnicas.
PURO ATAQUE, nada de andar pensando cómo corregir nada.


### Ejemplo adaptado a un juego de guerra inventado

Las alternativas están en este ejemplo a modo ilustrativo, no deben haber alternativas en la entrega.

* Objetivo del ataque: inhabilitar sin destruir el puerto enemigo con vistas a posteriormente tomarlo.

* Reconnaissance
  - Imagen satelital identifica una pista de aterrizaje.
  - Espías dicen que por el puerto entra el combustible.
  - Espías locales dicen que la playa cercana no tiene buena vigilancia.
  - Espías locales dicen que el bosque cercano no tiene buena vigilancia.

* Weaponization (con alternativas de ejemplo sobre la opción elegida)
  - **Decido** preparar un equipo de comandos de sabotage.
  - **Decido** preparar un equipo de comandos de sabotage con gomones de desembarco y un submarino para desembarcar en la playa cercana que no tiene buena vigilancia. (mejor)
  - **Decido** preparar un equipo de comandos de sabotage con equipo de comuicaciones Super High TeraHertz Radio que el adversario no puede detectar, gomones de desembarco y un submarino para desembarcar en la playa cercana que no tiene buena vigilancia. (mucho mejor)
  - **Puedo** *preparar un equipo de comandos de sabotage paracaidistas*
  - **Puedo** *preparar un bombardeo al puerto.*
  - **Puedo** *preparar la invasión directamente.*
  
* Delivery
  - Envío al equipo de sabotage a la playa cercana en submarino.
  - Envío al equipo de sabotage a la playa cercana en submarino y gomones de desembarco (mejor)
  
* Exploit (con alternativas de ejemplo)
  - El equipo logra desembarcar sin incidentes en la playa.
  - El equipo logra desembarcar sin incidentes en la playa por la falta de vigilancia.
  
* Installation (con alternativas de ejemplo)
  - El equipo se hace pasar por una compañia de circo como camuflaje. (si es porque el equipo encuentra una compañía de circo no hace falta que esté en Weaponization)
  - El equipo se esconde en un bosque cercano

* Command & Control
  - **Decido** utilizar Super High TeraHertz Radio que el adversario no puede detectar.
  - **Puedo** *utilizar palomas mensajeras.*
  
* Actions on Objectives
  - El equipo de comandos provoca daños menores en las cañerías.
  - El equipo de comandos coloca minas en el puerto dejando un camino para el desembarco.

#### Una leve variante para contemplar un ataque en etapas

* Actions on Objectives
  * Reconnaissance
    - El equipo disfrazado de payasos revisa las instalaciones para elegir los mejores puntos de ataque.

  * Weaponization
    - El equipo prepara cargas controladas por cables para su activación remota.

  * Delivery
    - El equipo se hace pasar por mantenimiento urbano y accede al puerto.

  * Exploit
    - El equipo instala las cargas en los lugares apropiados.

  * Command & Control
    - Se utilizarán cables para detonar las cargas

  * Actions on Objectives
    - Se activan la cargas y provocan daños menores en las cañerías.


  


  

