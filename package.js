Package.describe({
    name: "lightzam:z-infinite-scroll",
    summary: "angular directive to handle element scroll",
    description: "angular directive to handle element scroll",
    version: "1.1.3",
    git: "https://github.com/LightZam/zInfiniteScroll.git"
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@1.0');

    api.addFiles('zInfiniteScroll.js', 'client');
});
