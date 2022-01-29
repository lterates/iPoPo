const options = {
    swaggerDefinition: {
        info: {
            description: 'IPoPo API for support of the car sharing app.',
            title: 'IPoPo API',
            version: '1.0.0',
        },
        host: 'https://ipopo.herokuapp.com',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        }
        
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js']
};

module.exports = options; 