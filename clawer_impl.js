var path =require('path')
var fs =require('fs')
var action_path ='./action'

var action_files =fs.readdirSync(action_path)
var action_methods ={}
for(var i=0;i<action_files.length;++i){
  action_methods[action_files[i].replace(/.js$/,'')] =require(action_path+'/'+action_files[i])
}

var _execute =exports.execute =function(argv, callback){
  if (argv.length <3){
    callback(false, '', 'node ./clawer [action] [param...]')
  }else{
    if (action_methods.hasOwnProperty(argv[2])===false){
      callback(false, '', 'action '+argv[2]+' not found')
    }else{
      action_methods[argv[2]]['claw'](argv.slice(3), callback)
    }
  }
}