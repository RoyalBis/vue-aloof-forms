import type { App } from 'vue';
import { AloofField } from './components/index';
import { AloofTextInput } from './components/index';

export default {
    install: (app: App) => {
        app.component("AloofField", AloofField);
        app.component("AloofTextInput", AloofTextInput);
    }
}

export type { greeting } from './types/index';

export { AloofField };
export { AloofTextInput };