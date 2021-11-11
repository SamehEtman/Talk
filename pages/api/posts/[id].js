import { connectDB } from '../../../lib/db-uitl';
import { ObjectId } from 'mongodb';
const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB();
    const db = client.db();
    const id = req.query.id;
    const objId = new ObjectId(id);
    const post = await db.collection('blogs').findOne({ _id: objId });
    console.log(post);
    res.status(200).json({
      message: 'Fetched successfully !',
      post,
    });
    client.close();
  }
};

export default handler;
