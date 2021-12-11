<template>
    <h1 class="py-2 my-3 text-2xl dark:text-gray-200">Databases</h1>

    <!-- Cards -->
    <div class="grid gap-6 mb-8 md:grid-cols-3 xl:grid-cols-4">
        <!-- database count -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                <i class="icon-database" />
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Databases</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{databases.length}}</p>
            </div>
        </div>

        <!-- document count -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                <i class="icon-doc" />
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Documents</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ totalDocuments }}</p>
            </div>
        </div>

        <!-- size on disk -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                <i class="icon-hdd" />
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Disk Size</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ totalDiskSize }}</p>
            </div>
        </div>

        <!-- Card -->
        <!-- <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Pending contacts</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">35</p>
            </div>
        </div> -->
    </div>

    <DatabaseTable
        :databases="databases"
    />

    <!-- Charts -->
    <!-- <h2
        class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
    >
        Charts
    </h2>
    <div class="grid gap-6 mb-8 md:grid-cols-2">
        <div
        class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
        >
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Revenue
        </h4>
        <canvas id="pie"></canvas>
        <div
            class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
        >
            <div class="flex items-center">
            <span
                class="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"
            ></span>
            <span>Shirts</span>
            </div>
            <div class="flex items-center">
            <span
                class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"
            ></span>
            <span>Shoes</span>
            </div>
            <div class="flex items-center">
            <span
                class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"
            ></span>
            <span>Bags</span>
            </div>
        </div>
        </div>
        <div
        class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
        >
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Traffic
        </h4>
        <canvas id="line"></canvas>
        <div
            class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
        >
            <div class="flex items-center">
            <span
                class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"
            ></span>
            <span>Organic</span>
            </div>
            <div class="flex items-center">
            <span
                class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"
            ></span>
            <span>Paid</span>
            </div>
        </div>
        </div>
    </div> -->
</template>

<script>
    import { computed, reactive, watch } from 'vue';
    import DatabaseTable from '../components/DatabaseTable.vue';
    import ConnectionModal from '../components/ConnectionModal.vue';
    import store from '../js/store.js';
    import { formatBytes } from '../js/util';

    export default {
        components: {
            DatabaseTable,
            ConnectionModal
        },

        setup () {
            const databases = reactive([]);
            const pool = workerpool.pool({
                minWorkers: 'max',
                maxWorkers: 4
            });

            const getAllDBs = (url, auth) => {
                return fetch(`${url}/_all_dbs`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    }
                }).then((res) => res.json());
            };

            const getDBChunk = (dbs) => {
                return fetch(`${url.origin}/_dbs_info`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    },
                    body: JSON.stringify({ keys: dbs })
                }).then((res) => res.json());
            };

            const loadDBs = (conn) => {
                try {
                    // const url = new URL(conn.url);
                    const auth = btoa(`${conn.user}:${conn.pass}`);
                    
                    pool.exec(getAllDBs, [ conn.url, auth ])
                        .then((allDbs) => {
                            return new Promise((resolve) => {
                                const chunkSize = 100;
                                const numRequests = Math.ceil(allDbs.length / chunkSize);
                                let index = 0;

                                while (allDbs.length > 0) {
                                    const dbs = allDbs.splice(0, chunkSize);

                                    pool.exec(getDBChunk, [ dbs ])
                                        .then((res) => {
                                            console.log('res:', res);
                                            // add dbs to databases array (object?)
                                        })
                                        .finally(() => {
                                            index++;

                                            if (index >= numRequests) {
                                                return resolve(true);
                                            }
                                        })
                                }
                            });

                            // dbs = dbs.splice(0, 50);
                        })
                        .then((dbs) => dbs.map((db) => ({ ...db.info, size: db.info.sizes.file })))
                        .then((dbs) => dbs.sort((db1, db2) => db1.db_name - db2.db_name))
                        .then((dbs) => {
                            databases.splice(0, databases.length, ...dbs);
                        });
                } catch (err) {
                    console.error('loadDBs:err:', err);
                }
            };

            watch(() => store.conns[store.currConn], loadDBs);

            const totalDocuments = computed(() => databases.reduce((acc, curr) => acc + curr.doc_count, 0));
            const totalDiskSize = computed(() => formatBytes(databases.reduce((acc, curr) => acc + curr.size, 0)));

            // call initial loading of dbs
            loadDBs(store.conns[store.currConn]);

            return {
                databases,
                totalDocuments,
                totalDiskSize
            };
        }
    }
</script>
