import { AuthExceptionFilter } from './auth.exception-filter.js';
import { Container } from 'inversify';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { AuthService } from './auth.service.interface.js';
import { DefaultAuthService } from './default-auth.service.js';

export function createAuthContainer(){
  const authContainer=new Container()
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope()
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope()

  return authContainer
}