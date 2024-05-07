// src/routes/api/sendUDP.js
import { json } from '@sveltejs/kit';
import { createSocket } from 'dgram';

export async function POST(e) {
  const body = await e.request.json();
  const { ip, port, data } = body;

  const socket = createSocket('udp4');
  const message = Buffer.from(data);

  try {
    await new Promise((resolve, reject) => {
      socket.send(message, 0, message.length, port, ip, (err) => {
        socket.close();

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return json({ status: 200, body: 'UDP message sent' });
  } catch (err) {
    return json({ status: 500, body: 'Failed to send UDP message' });
  }
}