import React, { createContext, useContext, useEffect, useState } from 'react';
import { previewMessage } from './preview-events.js';

const Context = createContext(null);
export function Router({ children }) {
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const changed = () => {
      const next = window.location.hash.slice(1) || '/';
      setPath(next);
      if (window.parent !== window) window.parent.postMessage({ type: 'WIREFRAME_PATH_CHANGED', path: next }, '*');
    };
    const message = (event) => {
      const request = previewMessage(event, window.parent);
      if (request?.path) window.location.hash = request.path;
    };
    window.addEventListener('hashchange', changed);
    window.addEventListener('message', message);
    if (window.parent !== window) window.parent.postMessage({ type: 'WIREFRAME_READY' }, '*');
    return () => { window.removeEventListener('hashchange', changed); window.removeEventListener('message', message); };
  }, []);
  return <Context.Provider value={{ path, navigate: (to) => { window.location.hash = to; } }}>{children}</Context.Provider>;
}
export function useLocation() { return { path: useContext(Context).path }; }
export function useNavigate() { return { navigate: useContext(Context).navigate, back: () => window.history.back() }; }
export function Link({ to, ...props }) { return <a href={`#${to}`} {...props} />; }
