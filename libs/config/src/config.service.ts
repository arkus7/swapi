import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    if (fs.existsSync(filePath)) {
      const config = dotenv.parse(fs.readFileSync(filePath));
      this.envConfig = this.validateInput(config);
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get mongoDbUri(): string {
    return this.get('MONGODB_URI');
  }

  get restPort(): number {
    return parseInt(this.get('REST_PORT'), 10);
  }

  get graphqlPort(): number {
    return parseInt(this.get('GRAPHQL_PORT'), 10);
  }

  get isDebug(): boolean {
    const env = this.get('NODE_ENV');
    return env === 'test' || env === 'development';
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      GRAPHQL_PORT: Joi.number().default(3001),
      REST_PORT: Joi.number().default(3000),
      MONGODB_URI: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
