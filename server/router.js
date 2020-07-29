const routerData = {
    leo : { path : '/leo', method : 'POST' },
    user : { path : '/user', method : 'POST' },
}
const getRouters = req => {
  const { path } = ctx.request;
  const routerKey = path && path.replace("/", "");
  return routerData[routerKey];
}

module.exports = {
    routerData,
    getRouters
}