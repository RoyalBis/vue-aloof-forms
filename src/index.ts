import type { App } from 'vue';
import * as components from '@/components';


const componentsList = components.default;

const VueAloofForms = {
    install: (app: App) => {
        Object.keys(componentsList).forEach(name => {
            const test = (componentsList as any)[name];
            app.component(name, test);
        })
    }
}

export default VueAloofForms;