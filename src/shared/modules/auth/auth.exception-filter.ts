import { BaseAuthException } from './errors/index.js';
import { Logger } from './../../libs/logger/index.js';
import { Component } from './../../types/index.js';
import { inject, injectable } from 'inversify';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof BaseAuthException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}