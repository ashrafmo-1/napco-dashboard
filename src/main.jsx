import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import {Providers} from "./providers/providers.jsx";

createRoot(document.getElementById('root')).render(
    <Providers>
        <App/>
    </Providers>
);