import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectDB } from '../../../lib/db-uitl';
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize({ email, password }) {
        console.log(email, password);
        const client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
          client.close();
          throw new Error('User not found');
        }
        if (user.password != password) {
          client.close();
          throw new Error('Invalid Credintials');
        }
        return { email };
        client.close();
      },
    }),
  ],
});
