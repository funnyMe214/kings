import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { message, sender } = req.body;

    // Trigger a new message event
    pusher.trigger('chat', 'message', { message, sender });

    res.status(200).send('Message sent');
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};
