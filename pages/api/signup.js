import { connectDB } from '../../lib/db-uitl';

const handler = async (req, res) => {

  if (req.method === 'POST') {
    const { email, password } = req.body;
    const client = await connectDB();
    const db = client.db();
    const foundSimilarEmail = await db.collection('users').findOne({ email });
    if (foundSimilarEmail) {
      client.close();
      return res.status(400).json({
        error: 'Email already exits',
      });
    }
    const response = await db
      .collection('users')
      .insertOne({ email, password });
      
    res.status(201).json({
      message: 'Signed Up!',
      ...response,
    });
    return client.close();
  }
};
export default handler;
