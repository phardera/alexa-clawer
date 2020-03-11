

var path =require('path')
var fs =require('fs')
var action_path ='./action'

var action_files =fs.readdirSync(action_path)
var action_methods ={}
for(var i=0;i<action_files.length;++i){
  action_methods[action_files[i].replace(/.js$/,'')] =require(action_path+'/'+action_files[i])
}

if (process.argv.length <3){
  console.log('node ./clawer [action] [param...]')
}else{
  if (action_methods.hasOwnProperty(process.argv[2])===false){
    console.log('action '+process.argv[2]+' not found')
  }else{
    action_methods[process.argv[2]]['claw'](process.argv.slice(3))
  }
}