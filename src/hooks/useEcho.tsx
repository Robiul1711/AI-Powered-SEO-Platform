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
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST || host,
      wsPort: import.meta.env.VITE_REVERB_PORT || 443,
      wssPort: import.meta.env.VITE_REVERB_PORT || 443,
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
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
