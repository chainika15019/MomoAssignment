const ContentController = require('./controllers/content.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/content', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ContentController.createContent
    ]);
    app.get('/content/:typeContent', [
        ContentController.findByType
    ]);
    app.get('/contents/:key', [
        ContentController.findByName
    ]);
    app.get('/content', [
        ContentController.list
    ]);
};
