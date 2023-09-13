# Arquitectura Hexagonal - en Typescript
## con Vertical Slicing y Screaming Architecture

#### Este proyecto es un pequeño ejemplo (CRUD de usuarios) donde he podido, meramente, explorar los conceptos de los que parte "DDD" (Domain-Driven Design), "Clean Architecture" y "Arquitectura Hexagonal", los cuales son enfoques de diseño de software que se centran en la estructura arquitectónica, y organización, de un sistema de software.

Debemos recordar que  **_"no cualquier sistema de software requiere de este diseño".._**
pero poder expandir el conocimiento permite adquirir una nueva perspectiva y formas de ver el diseño

## Domain-Driven Design (DDD): 
Se centra en la gestión y modelado del dominio de la aplicación. Pone un alto énfasis en la comprensión profunda del dominio de negocio y la traducción de ese conocimiento en el diseño del software. La lógica de negocio se coloca en el núcleo de la aplicación, en un área llamada "modelo de dominio" o "core domain." Se busca que esta parte de la aplicación sea independiente de la infraestructura y las preocupaciones técnicas.

## Clean Architecture: 
Se enfoca en mantener una separación clara entre las necesidades de negocio, las reglas, y la infraestructura técnica. Propone una estructura en capas bien definida:
  - Entidades de Dominio: Contienen las reglas de negocio.
  - Casos de Uso: Contienen la lógica de aplicación que utiliza las entidades de dominio.
  - Adaptadores: Conectan la aplicación con la infraestructura externa (bases de datos, interfaces de usuario, servicios externos, etc.).

## Arquitectura Hexagonal: 
Se enfoca en hacer que la aplicación sea independiente de la infraestructura externa y permite el reemplazo fácil de esos componentes externos (por ejemplo, bases de datos o interfaces de usuario). Propone una estructura con tres áreas principales: 
  - El núcleo de la aplicación (lógica de negocio)
  - Los puertos (interfaces)
  - Los adaptadores (implementaciones concretas de las interfaces).

Donde la comunicación va en una sola dirección (externa -> interna)
##
Estos enfoques poseen una cierta interelación.. las cuales me quedan seguir estudiando
### Este es solo un primer paso para comprender el diseño de aplicaciones.
##
## 🚀 Estructura del Proyecto

Dentro del proyecto se encuentra el siguiente estructurado carpetas y archivos:

```
/
├── src/
│   └── user/
│       |── application/
│       |   └── usecase/
│       |       |── UserCreator
│       |       |── UserDeleter
│       |       |── UserGetter
│       |       └── UserUpdater
|       |
│       ├── domain/
│       |   |── entities/
│       |   |   └── User
│       |   |── exceptions
│       |   |── repository
│       |   |   └── UserRepository
│       |   └── services
|       | 
│       └── infrastructure/
│           |── driven-adapters/
│           |   └── aws/
│           |       └── dynamo-db/
│           |── driving-adapters/
│           |     |── api-rest-app/
│           |     └── console-app/
│           └── implementation/
│               |── Aws/
│               |    └── dynamo-db/
│               |        └── DynamoDBUserRepository
│               └── InMemory/
│                   └── InMemoryUserRepository
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                       | Acción                                             |
| :---------------------------- | :------------------------------------------------- |
| `npm install`                 | Instala las dependencias                           |
| `npm run start-console-app`   | Inicia la aplicación de consola                    |
| `npm run start-rest-app`      | Inicia el servidor local en `localhost:3001`       |

