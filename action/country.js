
var cheerio =require('cheerio')
var https =require('https')
var topsites =require('./../common/common')

exports.claw =function(arr){
  if (arr.length ===0){
    console.log('node ./clawer.js [country] [amount]')
    return
  }

  var country_name =arr[0]
  var amount =20
  if (arr.length>1 && isNaN(arr[1])===false){
    amount =arr[1]
  }

  //fetch country code
  var country_code_mapper ={}
  var opts ={
    host:'www.alexa.com',
    port:'443',
    path:'/topsites/countries',
    method:'GET'
  }
  var body =''
  var req =https.request(opts, (res)=>{
    res.on('data', (chunk)=>{
      body+=chunk
    })

    res.on('error', (e)=>{
      console.log(e)
    })
    
    res.on('end', ()=>{
      var loaded_body =cheerio.load(body)
      var countries_arr =loaded_body('.countries li')
      for(var i=0;i<countries_arr.length;++i){
        country_code_mapper[countries_arr.eq(i).text().trim().toLowerCase()] =countries_arr.eq(i).find('a').attr('href')
      }

      //fetch top sites grouped by country code
      if (country_code_mapper.hasOwnProperty(country_name.toLowerCase())===false){
        console.log('country '+country_name+' not found')
        return
      }

      topsites.claw('/topsites/'+country_code_mapper[country_name.toLowerCase()], amount)

    })
  })
  req.end()


}