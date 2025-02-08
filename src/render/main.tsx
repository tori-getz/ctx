import { createRoot } from 'react-dom/client';
import { App } from '~/app';
import { attachLogger } from 'effector-logger';

attachLogger();

const root = document.querySelector('#root');

createRoot(root!).render(<App />);
