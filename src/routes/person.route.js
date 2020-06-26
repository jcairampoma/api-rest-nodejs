/**
 * person.route.js
 * Expone los puntos de entrada a traves de endpoints, es el encargado de recibir las solicitudes http que los usuarios o clientes del api nos envia.
 * puede contener diferentes rutas usando combinaciones de diferentes verbos http y parametros
 * por ejemplo:
 * router.get('person/byIndex', '/:index', controller.getByIndex) maneja la solicitudes desde person/99 donde 99 es el valor del parametro index
 */

// LINEA AGREGADA: referenciamos los esquemas declarados
const personSchemas = require('../schemas/person.schema')

// LINEA AGREGADA: referenciamos el middleware de validacion de esquemas
const schemaValidator = require('../utils/schema-validator')

const KoaRouter = require('koa-router')
const PersonController = require('../controllers/person.controller')
const router = new KoaRouter({ prefix: '/person' })
const controller = new PersonController()

// LINEA AGREGADA: creamos una instancia del validador pasandole la parte del request que queremos validar en este caso (params) y el esquema apropiado
const byIndexValidator = schemaValidator({ params: personSchemas.byIndex })

// LINEA AGREGADA: creamos una instancia del validador pasandole la parte del request que queremos validar en este caso (body) y el esquema apropiado
const postValidator = schemaValidator({ body: personSchemas.post })


// GET /person/29
// router.get('person/byIndex', '/:index', controller.getByIndex)
router.get('person/byFilter', '/', controller.getByFilter)

// POST
// router.post('person/post', '/', controller.save)

// LINEA MODIFICADA: se agrega el validador antes de llamar al controller
router.get('person/byIndex', '/:index', byIndexValidator, controller.getByIndex)

// POST
// LINEA MODIFICADA: se agrega el validador antes de llamar al controller
router.post('person/post', '/', postValidator, controller.save)


module.exports = router
