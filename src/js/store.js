import { reactive, watch } from 'vue';
import { local } from './storage.js';

const name = 'couchman_store';
const _defaults = {
    isDark: true,
    id: -1,
    connections: {}
};

const initState = local.get(name, _defaults);

const store = reactive(initState);

watch(store, (state) => {
    local.set(name, state);
});

// initial setting of data in localStorage
local.set(name, store);

export default store;
