
var common =require('./../common/common')

exports.claw =function(arr, callback){
  if (arr.length ===0 || isNaN(arr[0])===true){
    callback(false, '', 'node ./clawer.js top [amount]')
    return
  }

  common.claw('/topsites', arr[0], callback)

}