const routerData = {
    leo : { path : '/leo', method : 'POST' },
    user : { path : '/user', method : 'POST' },
}
const getRouters = path => {
  const routerKey = path && path.replace("/", "");
  return {
    routerKey,
    router: routerData[routerKey]
  };
}

module.exports = {
    routerData,
    getRouters
}