import { createApp } from "vue";
import App from "./app.vue";
import {HlIcon} from '@hl-plus/components';
import '@hl-plus/theme-chalk/src/index.scss';

const app = createApp(App);
app.use(HlIcon);
app.mount("#app");
