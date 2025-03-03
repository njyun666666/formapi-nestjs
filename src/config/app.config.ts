export default () => ({
  app: {
    env: process.env.NODE_ENV,
    key: {
      formApi: process.env.KEY_FormAPI,
    },
    jwt: {
      issuer: process.env.JWT_ISSUER,
      secret: process.env.JWT_SECRET,
    },
  },
});

export interface AppConfig {
  env: string;
  key: {
    formApi: string;
  };
  jwt: {
    issuer: string;
    secret: string;
  };
}
