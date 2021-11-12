import { connectDB } from '../../../lib/db-uitl';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB();
    const db = client.db();
    const email = req.query.email;
    const user = await db.collection('users').findOne({ email });
    if (!user) res.status(404).json({ error: 'User not found' });
    res.status(200).json({
      ...user,
    });
  }
};
export default handler;
