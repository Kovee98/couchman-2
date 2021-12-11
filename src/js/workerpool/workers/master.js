import Worker from './worker.js?worker';

const master = {
    chunkSize: 100, // TODO: grab this from couchdb config dynamically
    numWorkers: 8,
    queue: [],  // task queue (method signature strings)
    workers: {},

    init () {
        // populate our pool of workers
        master.workers = new Array(master.numWorkers)
            .fill()
            .reduce((map, _, i) => {
                const worker = new Worker();

                worker.id = i;
                worker.status = 'ready';
                worker.onmessage = master.onMessage;

                map[i] = worker;
                return map;
            }, {});
    },

    onMessage (e = {}) {
        const worker = this;
        const data = e.data || {};

        // live updates
        postMessage(e.data);

        if (data.done) {
            // check for any pending tasks
            if (master.queue.length > 0) {
                const task = master.queue.shift();
                worker.status = 'busy';
                worker.postMessage(task);
                console.log(`worker${worker.id} grabbing ${task.task}`);
            } else {
                // worker is ready for the next task
                worker.status = 'ready';
                console.log(`worker${worker.id} ready for the next task`);
            }
        }
    },

    enqueueTasks (tasks) {
        master.queue.push(...tasks);

        // assign tasks to any available workers
        const workers = Object.values(master.workers).filter((worker) => worker.status === 'ready');

        workers.forEach((worker) => {
            const task = master.queue.shift();
            if (task) {
                worker.status = 'busy';
                worker.postMessage(task);
                console.log(`worker${worker.id} grabbing ${task.task}`);
            }
        });
    }
};

onmessage = function (e) {
    const data = e.data;
    const args = data.args || [];

    master[data.task](...args);
};

master.init();
