module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [], //Especificamos ciertos patrones de modulo que queremos que sean ignorados por jest
}