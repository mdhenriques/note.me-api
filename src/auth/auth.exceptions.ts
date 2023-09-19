import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUsernameException extends HttpException {
  constructor() {
    super('Invalid username.', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    super('Invalid password.', HttpStatus.UNAUTHORIZED);
  }
}