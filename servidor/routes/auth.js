// Rutas para authenticar usuario
const exrpress= require('express')
const router= exrpress.Router();
const {check} = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')


// Iniciar sesios
// Crea un usuario
// api/auth
router.post('/', 

    authController.autenticarUsuario
);


// Obtieen el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado

)

module.exports = router;

