import { connectDB } from '../../../lib/db-uitl';
const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB();
    const db = client.db();
    const blogs = await db.collection('blogs').find().toArray();
    return res.status(200).json({
      message: 'Data fetched succesfully',
      blogs,
    });
    client.close();
  }
  if (req.method === 'POST') {
    const client = await connectDB();
    const db = client.db();
    const { title, summary, content, image, owner } = req.body;
    const blogs = await db.collection('blogs').insertOne({
      title,
      summary,
      content,
      image,
      owner,
    });
    res.status(201).json({ message: 'Created succefully' });
    client.close();
  }
};

export default handler;
