import type { App } from 'vue';
import { AloofField } from './components/index';
import { AloofFileInput } from './components/index';
import { AloofForm } from './components/index';
import { AloofOptionsInput } from './components/index';
import { AloofTextInput } from './components/index';
import { DefaultValidators } from './types';

export default {
    install: (app: App) => {
        app.component("AloofField", AloofField);
        app.component("AloofFileInput", AloofFileInput);
        app.component("AloofForm", AloofForm);
        app.component("AloofOptionsInput", AloofOptionsInput);
        app.component("AloofTextInput", AloofTextInput);
    }
}

export {
    AloofField,
    AloofFileInput,
    AloofForm,
    AloofOptionsInput,
    AloofTextInput
};

export {
    DefaultValidators
}

export type { AloofFieldData } from './types';
export type { Validator } from './types';