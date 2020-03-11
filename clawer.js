

var clawer =require('./clawer_impl')

clawer.execute(process.argv, (success, ret, err)=>{
  if (success===true){
    console.log(ret)
    process.exit(0)
  }else{
    console.log(err)
    process.exit(1)
  }
})