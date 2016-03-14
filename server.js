
import Configure from 'hapi-configure';
import Path from 'path';
import Routes from './lib/server_routes';
import Ejs from 'ejs';

const init = async () => {

    const server = await Configure();

    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: '../lib/app/views'
    });

    server.route({
        method: 'GET',
        path: '/bundle.js',
        handler: (request, reply) => {
            reply.file(Path.join(__dirname, 'static/bundle.js'));
        }
    });

    Routes.init(server);

    await server.start();

    console.log('Server running at', server.info.uri);

    return Promise.resolve(server);
};

init().catch(error => console.log(error.stack));