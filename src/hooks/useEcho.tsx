import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/slices/authSlice';

(window as any).Pusher = Pusher;

const useEcho = () => {
  const token = useSelector(selectCurrentToken);
  const [echoInstance, setEchoInstance] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const host = new URL(import.meta.env.VITE_API_URL).hostname;

    const echo = new Echo({
      broadcaster: 'reverb', // Switched to Reverb as requested
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      wsHost: host,
      wsPort: 443,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`.replace('/api/broadcasting/auth', '/broadcasting/auth'),
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    });

    setEchoInstance(echo);

    return () => {
      echo.disconnect();
    };
  }, [token]);

  return echoInstance;
};

export default useEcho;
