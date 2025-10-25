// karma.conf.js
const webpackConfig = require('./config/webpack.config'); // Ruta a la config de Webpack después de eject

module.exports = function(config) {
  config.set({
    // Frameworks a usar: Jasmine como framework de pruebas y Webpack para procesar los archivos.
    frameworks: ['jasmine', 'webpack'],

    // Archivos a cargar/observar por Karma: Busca todos los .spec.js y .spec.jsx dentro de src/tests
    files: [
      'src/tests/**/*.spec.js',
      'src/tests/**/*.spec.jsx'
      // Podrías necesitar añadir polyfills aquí si tus pruebas los requieren
    ],

    // Archivos a excluir
    exclude: [],

    // Preprocesadores: Qué hacer con los archivos antes de ejecutarlos
    preprocessors: {
      // Aplica Webpack (para manejar imports, JSX, etc.) y sourcemaps a los archivos de prueba
      'src/tests/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/tests/**/*.spec.jsx': ['webpack', 'sourcemap']
    },

    // Configuración de Webpack para Karma: Usa la configuración de desarrollo de tu proyecto ejectado
    webpack: {
      module: webpackConfig('development').module,
      resolve: webpackConfig('development').resolve,
      mode: 'development',
      devtool: 'inline-source-map', // Genera sourcemaps para facilitar el debugging
      // Configuración necesaria para evitar errores con ciertos módulos en el entorno de Karma
      node: {
        global: true, // O `false` si prefieres evitar polyfills de Node globales
        __filename: true,
        __dirname: true,
      },
      // Si tienes alias configurados en webpack.config.js, asegúrate de replicarlos aquí si es necesario
      // resolve: {
      //   ...webpackConfig('development').resolve,
      //   alias: { ... }
      // }
    },

    // Middleware de Webpack: Reduce la cantidad de mensajes en la consola de Karma
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Reporteros: Cómo mostrar los resultados ('progress' es el básico)
    reporters: ['progress'],

    // Puerto del servidor de Karma
    port: 9876,

    // Usar colores en la salida
    colors: true,

    // Nivel de logging
    logLevel: config.LOG_INFO,

    // Observar cambios en archivos y re-ejecutar pruebas automáticamente
    autoWatch: true,

    // Navegador a usar para las pruebas
    browsers: ['Chrome'], // Puedes usar 'ChromeHeadless' para que no abra una ventana visible

    // Ejecutar una sola vez y salir (ideal para CI, ponlo en 'false' para desarrollo)
    singleRun: false,

    // Concurrencia de navegadores
    concurrency: Infinity
  });
};