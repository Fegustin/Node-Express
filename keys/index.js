export default {
    urlMongoDb: process.env.URLDB ?? 'mongodb+srv://ziotyr:90afudit@cluster0.n8bcm.mongodb.net/todos',
    sessionSecret: process.env.SESSIONSECRET ?? 'some body',
    emailFrom: process.env.EMAIL ?? 'ziotyr1@gmail.com',
    passwordEmailFrom: process.env.EMAILPASS ?? 'konosuba90',
    baseURL: process.env.URL ?? 'http://localhost:3000',
    jwt: process.env.JWT ?? 'dev-jwt'
}