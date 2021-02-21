import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User, Product } from './schemas';

// eslint-disable-next-line
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // 30 days, how long the jwt cookie last for
  secret: process.env.COOKIE_SECRET, // jwt secret key
};

const { withAuth } = createAuth({
  listKey: 'User', // which schema is responsible for being the user
  identityField: 'email', // unique identifier
  secretField: 'password', // credentials
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add roles for default seeded user
  },
});

export default withAuth(
  config({
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
      User,
      Product,
    }),
    ui: {
      // Show UI only for people that pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // what values to pass with any session
      User: 'id name email',
    }),
  })
);
