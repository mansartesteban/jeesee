import { createApp } from 'vue';
import App from '@ui/App';

import "@assets/styles/_jeesee.scss";
import routing from "./routing";

createApp(App)
    .use(routing)
    .mount('#jeesee');
