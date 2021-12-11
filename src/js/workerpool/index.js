import Master from './workers/master.js?worker';

const pool = {
    master: new Master(),

    queue (tasks, opts) {
        return new Promise((resolve, reject) => {
            pool.master.onerror = reject;
            pool.master.onmessage = function (e = {}) {
                const data = e.data || {};
    
                if (opts.on) {
                    opts.on(data);
                }
    
                if (data.done) {
                    return resolve(...data.args);
                }
            }
    
            // normalize into array of tasks
            tasks = [ tasks ].flat();
    
            pool.master.postMessage({
                task: 'enqueueTasks',
                args: [ tasks ]
            });
        });
    }
};

export default pool;
