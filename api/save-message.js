import fs from 'fs';
import path from 'path';

const saveMessage = async (message) => {
  const messagesFilePath = path.resolve('./utils/messages.json');
  const messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));

  messages.push(message);

  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const { message, sender } = req.body;

    await saveMessage({ message, sender });

    res.status(200).json({ status: 'Message saved' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};
