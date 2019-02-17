/**
 * @description Get environment variable value by name
 * @author David Vilaça
 * @date 2019-01-15
 * @param {string} name
 * @returns {(string | null)}
 */
function getEnv(name: string): string | null {
  return process.env[name] || null
}

const nodeEnv = getEnv('NODE_ENV')

export const envoriments = {
  isDev: nodeEnv === 'development',
  isProd: nodeEnv === 'production',
  isStg: nodeEnv === 'staging',
  PORT: Number(getEnv('PORT')) || 3000,
  PRISMA_ENDPOINT: getEnv('PRISMA_ENDPOINT') || '',
  PRISMA_SECRET: getEnv('PRISMA_SECRET') || '',
  CORS_ORIGIN: getEnv('CORS_ORIGIN') || '*',
  CORS_METHODS: getEnv('CORS_METHODS') || 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
