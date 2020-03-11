
var common =require('./../common/common')

exports.claw =function(arr){
  if (arr.length ===0 || isNaN(arr[0])===true){
    console.log('node ./clawer.js top [amount]')
    return
  }

  common.claw('/topsites', arr[0])

}