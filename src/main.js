import { createApp } from 'vue';
import App from '@ui/App';

import VueCodeHighlight from 'vue-code-highlight';

import "@assets/styles/_jeesee.scss";
import routing from "./routing";
import "./extensions";

import Engine from "@/engine/game/Engine";
import EngineApp from "@/engine";

const app = createApp(App);

app.config.globalProperties.$engine = new Engine();

app
    .use(routing)
    .use(VueCodeHighlight)
    .use(EngineApp)
    .mount('#jeesee');


// import "./test";