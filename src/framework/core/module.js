import {router} from '../tools/router';
import {wfm} from '../tools/util';

export class Module {
    constructor(config) {
        this.conponents = config.components;
        this.bootstrapComponent = config.bootstrap;
        this.routes = config.routes;
    }

    start() {
        this.initComponents();
        if (this.routes) this.initRoutes();
    }

    initRoutes() {
        window.addEventListener('hashchange', this.renderRoute.bind(this));
        this.renderRoute();
    }

    renderRoute() {
        let url = router.getUrl();
        let route = this.routes.find(route => route.path === url);

        if (wfm.isUndefined(route)) {
            route = this.routes.find(route => route.path === '**');
        }

        document.querySelector('router-outlet').innerHTML = `<${route.component.selector}></${route.component.selector}>`;
        this.renderComponent(route.component);
    }

    initComponents() {
        this.bootstrapComponent.render();
        this.conponents.forEach(this.renderComponent.bind(this));
    }

    renderComponent(component) {
        component.render();
    }
}
