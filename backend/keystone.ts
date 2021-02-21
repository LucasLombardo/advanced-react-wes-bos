import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // 30 days, how long the jwt cookie last for
  secret: process.env.COOKIE_SECRET, // jwt secret key
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true, // will pass along the session cookie
    },
  },
  db: {
    adapter: 'mongoose', // what keystone uses under the hood, knex if using sql
    url: process.env.DATABASE_URL,
    // TODO: data seeding
  },
  lists: createSchema({
    // TODO: add schema items
  }),
  ui: {
    // TODO: check roles before allowing access to control panel
    isAccessAllowed: () => true,
  },
  // TODO: add session values here
});
