import * as log4js from 'log4js'

const escriba = require('escriba')

export class Logger {
  private internalLogger: any

  constructor() {
    log4js.configure({
      appenders: {
        out: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '[%d] %m'
          }
        }
      },
      categories: {
        default: {
          appenders: ['out'],
          level: 'info'
        }
      }
    })
  }

  get logger() {
    if (!this.internalLogger) {
      this.internalLogger = {
        write: (...args: any[]) =>
          escriba({
            loggerEngine: log4js.getLogger(),
            service: 'YOUR_PROJECT_NAME',
            sensitive: {
              password: {
                paths: ['body.provider.key'],
                pattern: /(ak_test|ak_live).*/g,
                replacer: '*'
              }
            },
            httpConf: {
              logIdPath: 'headers.x-request-id',
              propsToLog: {
                request: [
                  'id',
                  'method',
                  'url',
                  'body',
                  'httpVersion',
                  'referrer',
                  'referer',
                  'user-agent'
                ],
                response: [
                  'id',
                  'method',
                  'url',
                  'statusCode',
                  'body',
                  'httpVersion',
                  'referrer',
                  'referer',
                  'user-agent',
                  'latency'
                ]
              },
              envToLog: ['SHELL', 'PATH'],
              skipRules: [
                {
                  route: /\/_health_check/,
                  method: /.*/,
                  onlyBody: false
                }
              ]
            }
          }).httpLogger
      }
    }
    return this.internalLogger
  }
}
