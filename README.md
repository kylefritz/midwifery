midwifery
=========

inside joke domain purchase

## Development
```
$ yarn start
```

## Deployment

```
$ aws configure
$ yarn run deploy
```

### Mirrored deployment to http://kyle.fritz.io/midwifery/
To get around .xxx domains being banned, we deploy this project to two places.

To deploy to kyle's github account, change packpage.json:

```
+ "homepage": "http://kylefritz.github.io/midwifery",
"dependencies": {
+  "gh-pages": "^1.1.0",
...
"scripts": {
+   "deploy": "gh-pages -d build",
...
```
