import { join, resolve } from 'path';

export default {
    root: join('.', 'examples'),
    publicDir: join('.', 'examples'),
    resolve: {
        alias: [
            {
                find: 'gl-layer',
                replacement: resolve('.', 'src', 'index.js'),
            },
        ],
    },
};
