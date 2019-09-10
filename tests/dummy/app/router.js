import AddonDocsRouter, { docsRoute } from "ember-cli-addon-docs/router";
import config from "./config/environment";

const Router = AddonDocsRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL,
});

Router.map(function() {
    docsRoute(this, function() {
        this.route("setup", { path: "/" });
        this.route("howto");
        this.route("api");
        this.route("components", function() {
            this.route("tr-toggle");
            this.route("tr-table");
            this.route("splitview");
            this.route("tr-select");
            this.route("tr-select-editor");
            this.route("tr-numeric-editor");
            this.route("tr-datetime-picker");
            this.route("tr-menubar");
            this.route("tr-button-editor");
            this.route("tr-map-editor");
            this.route("rating-editor");
            this.route("tr-checkbox-editor");
            this.route("tr-listview");
        });
    });
    this.route("not-found", { path: "/*path" });
});

export default Router;
