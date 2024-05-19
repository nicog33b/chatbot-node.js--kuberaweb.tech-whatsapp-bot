const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = 'mongodb+srv://kuberachatbot:kuberachatbot@kubera-chatbot.plt3rza.mongodb.net/?retryWrites=true&w=majority&appName=kubera-chatbot'
const MONGO_DB_NAME = 'kubera-chatbot'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const planBasico = addKeyword(['basico'])
    .addAnswer('Plan Básico - Ideal para emprendimientos y pequeñas empresas:')
    .addAnswer('- Diseño web responsivo adaptado a todos los dispositivos.')
    .addAnswer('- Hasta 5 páginas incluidas (Inicio, Acerca de, Servicios, contacto, etc).')
    .addAnswer('- Soporte técnico básico.')
    .addAnswer('- Optimización básica SEO para mejorar tu visibilidad en Google.')
    .addAnswer('Este plan es perfecto si estás empezando y necesitas una presencia online profesional y efectiva a un precio asequible.')

const planIntermedio = addKeyword(['intermedio'])
    .addAnswer('Plan Intermedio - Diseñado para negocios en crecimiento:')
    .addAnswer('- Todas las características del Plan Básico.')
    .addAnswer('- 10 secciones.')
    .addAnswer('- Integración con redes sociales y Google Maps.')
    .addAnswer('- SEO avanzado con análisis de palabras clave y optimización en página.')
    .addAnswer('- Soporte técnico email, teléfono, teamviewer.')
    .addAnswer('- Asesoramiento de contenido.')
    .addAnswer('Elige el Plan Intermedio si buscas fortalecer tu presencia online con más contenido y funcionalidades avanzadas.')

const planProfesional = addKeyword(['profesional'])
    .addAnswer('Plan Profesional - Para empresas que demandan lo mejor:')
    .addAnswer('- Incluye todas las características de los planes Básico e Intermedio.')
    .addAnswer('- Sitio web con número ilimitado de páginas y contenido gestionable.')
    .addAnswer('- E-commerce completo con carrito de compras y pagos en línea.')
    .addAnswer('- Personalización completa del diseño y funcionalidades.')
    .addAnswer('- Análisis de datos web detallados y reportes de rendimiento.')
    .addAnswer('- Soporte prioritario 24/7.')
    .addAnswer('- Sesiones mensuales de revisión de estrategia digital.')
    .addAnswer('Recomendado para grandes empresas que requieren una solución integral y personalizada para dominar su mercado online.')

const flowPrincipal = addKeyword(['planes'])
    .addAnswer('🙌 Hola bienvenido! Así que quieres conocer los planes, sigue las instrucciones abajo:')
    .addAnswer('Escribe "basico" para conocer el Plan Básico.')
    .addAnswer('Escribe "intermedio" para conocer el Plan Intermedio.')
    .addAnswer('Escribe "profesional" para conocer el Plan Profesional.')

const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: MONGO_DB_URI,
        dbName: MONGO_DB_NAME,
    })
    const adapterFlow = createFlow([flowPrincipal, planBasico, planIntermedio, planProfesional])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
