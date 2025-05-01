import config from 'config';
import path from 'node:path';

 const serverConfig = {
   PORT: config.get('PORT') || 4000,
   publicPath: () => path.join(process.cwd(), 'public'),
   viewsPath: () => path.join(process.cwd(), 'src', 'views')
}

export default serverConfig;