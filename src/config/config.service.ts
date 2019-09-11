import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ConfigKeys } from './config.interface';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: ConfigKeys): string {
    return this.envConfig[key];
  }
}
