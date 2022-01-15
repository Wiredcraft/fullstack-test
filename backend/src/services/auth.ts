import IUser, {IUserInputDTO} from '../interfaces/IUser';
import UserModel from '../models/user';
import argon2 from 'argon2';
import environment from '../lib/environment';
import jwt from 'jsonwebtoken';
import {randomBytes} from 'crypto';

/**
 * Authentication service.
 */
class AuthService {
  userModel: typeof UserModel;
  jwtSecret: string;

  /**
    * Initialize User model.
  */
  constructor() {
    const {
      JWT_SECRET,
    } = environment.getEnvironment();

    this.userModel = UserModel;
    this.jwtSecret = JWT_SECRET;
  }

  /**
   * Signup and retrieve the user interface and it's JSON web token.
   * @param {IUserInputDTO} userInputDTO The User input DTO.
   * @return {Promise<IUser, string>} User and JWT.
   */
  public async register(userInputDTO: IUserInputDTO): Promise<
  { user: IUser; token: string }
  > {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, {salt});

      const userRecord = await this.userModel.create({
        ...userInputDTO,
        role: userInputDTO.username === 'admin' &&
         process.env.NODE_ENV !== 'production' ? 'admin' : 'user',
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      const token = this.generateToken(userRecord);
      if (!userRecord) {
        throw Error('User cannot be created');
      }
      const user = userRecord.toObject();
      return {user, token};
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * login and retrieve the user interface and it's JSON web token.
   * @param {string} email The User email.
   * @param {string} password The User password (hashed).
   * @return {Promise<IUser, string>} User and JWT.
   */
  public async login(
      email: string, password: string,
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({email});
    if (!userRecord) {
      throw Error('User cannot be found');
    }
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = this.generateToken(userRecord);
      const user = userRecord.toObject();
      return {user, token};
    } else {
      throw Error('Invalid user credentials');
    }
  }

  /**
   * Generate a JSON web token.
   *
   * @param {IUser} user User interface.
   * @return {string} JSON Web Token.
   */
  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
          role: user.role,
          username: user.username,
          exp: exp.getTime() / 1000,
        },
        this.jwtSecret,
    );
  }
}

export default AuthService;
