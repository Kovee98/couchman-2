import { reactive, watch } from 'vue';
import { local } from './storage.js';

const name = 'couchman_store';
const _defaults = {
    isDark: true
};

const initState = local.get(name, _defaults);

const store = reactive(initState);

watch(store, (state) => {
    local.set(name, state)
});

export default store;
