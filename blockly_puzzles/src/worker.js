
self.onmessage = (e) => {
    if (e.data.type !== 'run') return;
    const code = e.data.code;

    const logpush = (x) => self.postMessage({ type: 'logpush', text: x.toString() });

    const fn = new Function('logpush', code);
    try {
        fn(logpush);
    } catch (e) {
        logpush(e);
    } finally {
        self.postMessage({ type: 'done' });
    }
};
