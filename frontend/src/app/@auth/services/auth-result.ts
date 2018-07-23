import { NbAuthToken } from './token/token';

export class NbAuthResult {

  protected token: NbAuthToken;
  protected errors: string[] = [];
  protected message: string[] = [];

  // TODO: better pass object
  constructor(protected success: boolean,
              protected response?: any,
              protected redirect?: any,
              errors?: any,
              message?: any,
              token: NbAuthToken = null) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.message = this.message.concat([message]);
    if (message instanceof Array) {
      this.message = message;
    }

    this.token = token;
  }

  getResponse(): any {
    return this.response;
  }

  getToken(): NbAuthToken {
    return this.token;
  }

  getRedirect(): string {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getMessages(): string[] {
    return this.message.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
