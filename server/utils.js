const UTILS = {
    parsePostData(ctx){
        return new Promise((resolve, reject) => {
            try {
                let postdata = "";
                ctx.req.addListener('data', (data) => {
                  postdata += data
                })
                ctx.req.addListener("end",function(){
                  let parseData = UTILS.parseQueryStr( postdata )
                  resolve( parseData )
                })
              } catch ( err ) {
                reject(err)
              }
        })
    },
    parseQueryStr(queryStr){
        let queryData = {}
        let queryStrList = queryStr.split('&')
        console.log( queryStrList )
        for (  let [ index, queryStr ] of queryStrList.entries()  ) {
          let itemList = queryStr.split('=')
          queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
        }
        return queryData
    }
    
}

module.exports = UTILS;