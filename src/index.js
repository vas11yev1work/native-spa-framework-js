import {bootstrap, wfm} from './framework';
import {appModule} from './app/app.module';

wfm.delay().then(() => {
    bootstrap(appModule);
});
