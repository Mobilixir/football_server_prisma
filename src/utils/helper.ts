import Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import crypto from 'crypto';
import { eUserType, Prisma } from '@prisma/client';

import prismaClient from './database';
import { jwt_token, validity, encryption_algorithm, encryption_key, iv_length } from '../utils/config';
import iJwtPayload from '../interface/jwt_payload';
import { User } from '@prisma/client';

// Generate secret hash with crypto to use for encryption
const key = crypto.createHash('sha512').update(encryption_key).digest('hex').substring(0, 32);
const encryptionIV = crypto.createHash('sha512').update(iv_length).digest('hex').substring(0, 16);

const isEmpty = (value: unknown) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(encryption_algorithm, key, encryptionIV);
  return Buffer.from(cipher.update(text, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
};

const decrypt = (text: string) => {
  const buff = Buffer.from(text, 'base64');
  const decipher = crypto.createDecipheriv(encryption_algorithm, key, encryptionIV);
  return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'); // Decrypts data and converts to utf8
};

const createJwtAuthToken = (user: User) => {
  const id = user.id!.toString();
  const encrypted_id = encrypt(id);

  const contents: iJwtPayload = {
    id: encrypted_id,
    createdAt: Date.now(),
  };
  const token = Jwt.sign(contents, jwt_token, { expiresIn: validity, algorithm: 'HS256' });

  return token;
};

const checkUserRole = async (user_id: string, res: Response, role: eUserType[]) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({ where: { id: user_id } });
    if (user && role.includes(user.role)) {
      return user;
    }
    return res.status(401).send({
      status: true,
      message: 'You are not authorised for this action',
      data: {},
    });
  } catch (error: unknown) {
    return res.status(200).send({
      status: false,
      message: JSON.stringify(error),
      data: [],
    });
  }
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(200).send({
      status: false,
      message: 'Something went wrong.',
      error: error.message,
    });
  } else {
    return res.status(200).send({
      status: false,
      message: 'Something went wrong.',
      error: {},
    });
  }
};

const getUserFromToken = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      status: true,
      message: 'You are not authorised for this action',
      data: {},
    });
  }
  const token = authorization!.split(' ')[1];
  const decodedToken = <iJwtPayload>Jwt.verify(token, jwt_token);
  const { id } = decodedToken;
  return decrypt(id);
};

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>], string>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

const helper = { isEmpty, createJwtAuthToken, checkUserRole, handleError, getUserFromToken, prismaExclude };
export default helper;
