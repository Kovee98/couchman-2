import { formatBytes } from '../../util.js';

const worker = {
    getDBChunk (url, user, pass, dbs) {
        url = new URL(url);
        const auth = btoa(`${user}:${pass}`);

        fetch(`${url.origin}/_dbs_info`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify({ keys: dbs })
        }).then((res) => res.json())
        .then((dbs) => dbs.map((db) => ({ ...db.info, size: formatBytes(db.info.sizes.file) })))
        .then((dbs) => {
            postMessage({
                task: 'updateDBs',
                args: [ dbs ],
                done: true
            });
        })
    },

    getAllDBs (url, user, pass) {
        url = new URL(url);
        const auth = btoa(`${user}:${pass}`);

        fetch(`${url.origin}/_all_dbs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        }).then((res) => res.json())
        .then((allDbs) => {
            postMessage({
                args: [ allDbs ],
                done: true
            });
        });
    },
};

onmessage = function (e) {
    const data = e.data;
    const args = data.args || [];

    worker[data.task](...args);
};
