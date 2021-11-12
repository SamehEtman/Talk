import { connectDB } from '../../../lib/db-uitl';
import { ObjectId } from 'mongodb';
const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB();
    const db = client.db();
    const id = req.query.id;
    const objId = new ObjectId(id);
    const post = await db.collection('blogs').findOne({ _id: objId });
    res.status(200).json({
      message: 'Fetched successfully !',
      post,
    });
    client.close();
  } else if (req.method === 'DELETE') {
    const client = await connectDB();
    const db = client.db();
    const id = req.query.id;
    const objId = new ObjectId(id);
    const post = await db.collection('blogs').findOneAndDelete({ _id: objId });
    if (!post) res.status(404).json({ error: 'blog not found' });
    res.status(200).json({
      message: 'Deleted successfully !',
    });
    client.close()
  }
};

export default handler;
