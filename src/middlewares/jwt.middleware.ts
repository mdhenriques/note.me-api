// extract-user-id.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';

export interface CustomRequest extends Request {
  userId?: number;
}

@Injectable()
export class ExtractUserIdMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length);
      

      try {
        const decodedToken: any = jwt.verify(token, jwtConstants.secret); // Substitua pelo seu segredo JWT real
        console.log(decodedToken)
        if (decodedToken && decodedToken.id) {
          req.userId = decodedToken.id; // Define o userId na solicitação
          console.log(req.userId)
        }
      } catch (error) {
        console.log(error);
      }
    }

    next();
  }
}
