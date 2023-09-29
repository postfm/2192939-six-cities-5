import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from './index.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { resolve } from 'node:path';

/**Имплементация нужна чтобы в будущем можно было легко сменить логгер или
 * добавить новый на основе интерфейса Logger*/
export class PinoLogger implements Logger {
  /**Создает экземпляр pino в приватном свойстве потому что оно нужно будет нам однократно*/
  private readonly logger: PinoInstance;
  constructor() {
    /**Получает абсолютный путь к модулю getCurrentModuleDirectoryPath */
    const modulePath = getCurrentModuleDirectoryPath();
    /**Указывает относительный путь к файлу с логами */
    const logFilePath = 'logs/rest.log';
    /**Вычисляет абсолютный путь к файлу с логами */
    const destination = resolve(modulePath, '../../../', logFilePath);

    /**Указывает в качестве транспорта файлы для записи логов */
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug',
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info',
        },
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  /**На основе приватного свойства создаем методы класса, предусмотренный интерфейсом */
  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public fatal(message: string, ...args: unknown[]): void {
    this.logger.fatal(message, ...args);
  }
}
