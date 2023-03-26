import { createApp } from 'vue';
import App from '@ui/App';

import "@assets/styles/_jeesee.scss";
import routing from "./routing";

import Engine from "@/engine/game/Engine";

const app = createApp(App);

app.config.globalProperties.$engine = new Engine();

app.use(routing)
    .mount('#jeesee');
