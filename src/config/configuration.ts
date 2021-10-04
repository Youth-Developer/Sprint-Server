import 'dotenv/config';
export default () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || ''),
    user: process.env.DB_USER || '',
    name: process.env.DB_NAME || '',
    password: process.env.DB_PW || '',
  },
});
