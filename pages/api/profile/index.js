import { connectDB } from '../../../lib/db-uitl';
const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    const client = await connectDB();
    const db = client.db();
    const { email, currentPassword, newPassword, username } = req.body;
    if (!email || !currentPassword || !newPassword) {
      res.status(400).json({
        error: 'Bad Input',
      });
      return client.close();
    }

    const user = await db
      .collection('users')
      .findOne({ email, password: currentPassword });
    if (!user) {
      res.status(400).json({
        error: 'Invalid current password',
      });
      return client.close();
    }
    const newUser = await db
      .collection('users')
      .findOneAndUpdate(
        { _id: user._id },
        { $set: { password: newPassword, username } }
      );
    res.status(200).json({
      message: 'Update completed!',
    });
    client.close();
  }
};
export default handler;
