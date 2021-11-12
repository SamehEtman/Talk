import { connectDB } from '../../../lib/db-uitl';
const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    const client = await connectDB();
    const db = client.db();
    const { email, currentPassword, newPassword, username } = req.body;
    if (!email || !currentPassword || !newPassword)
      res.status(400).json({
        error: 'Bad Input',
      });

    const user = await db
      .collection('users')
      .findOne({ email, password: currentPassword });
    console.log(user);
    if (!user) {
      res.status(400).json({
        error: 'Invalid current password',
      });
    }
    const newUser = await db
      .collection('users')
      .findOneAndUpdate({ _id: user._id }, { $set :{password: newPassword, username} });
    console.log(newUser);
    res.status(200).json({
      message: 'Update completed!',
    });
  }
};
export default handler;
