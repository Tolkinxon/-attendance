import config from 'config';
import path from 'node:path';

 const serverConfig = {
   PORT: config.get('PORT') || 4000,
   TOKEN_KEY: config.get('TOKEN_KEY'),
   publicPath: () => path.join(process.cwd(), 'public'),
   dbPath: (fileName) => path.join(process.cwd(), 'db', fileName + '.json'),
   viewsPath: () => path.join(process.cwd(), 'src', 'views')
}

export default serverConfig;