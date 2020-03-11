
var cheerio =require('cheerio')
var https =require('https')

exports.claw =function(url_path, min_list, callback){

  var opts ={
    host:'www.alexa.com',
    port:'443',
    path:url_path,
    method:'GET'
  }
  var body =''
  var req =https.request(opts, (res)=>{
    res.on('data', (chunk)=>{
      body+=chunk
    })

    res.on('error', (e)=>{
      callback(false, e)
    })
    
    res.on('end', ()=>{
      var loaded_body =cheerio.load(body)
      var tr_arr =loaded_body('.listings .tr')
      var ret =''
      for(var i=1;i<Math.min((parseInt(min_list)+1), tr_arr.length);++i){
        var col =tr_arr.eq(i).find('.td')
        ret +=col.eq(0).text().trim()+' : '+col.eq(1).text().trim()+'\n'
      }

      callback(true, ret, undefined)
    })
  })
  req.end()
}