

var clawer =require('./../clawer_impl')
var expect = require('chai').expect;

var check_list =[
  {desc:'void action',                                          param:['', '', 'void_action'],               expected:(result)=>{return 'action void_action not found'}},
  {desc:'lack action',                                          param:['', ''],                              expected:(result)=>{return 'node ./clawer [action] [param...]'}},
  {desc:'top action without amout value',                       param:['', '', 'top'],                       expected:(result)=>{return 'node ./clawer.js top [amount]'}},
  {desc:'top action with not a number',                         param:['', '', 'top', 'nan'],                expected:(result)=>{return 'node ./clawer.js top [amount]'}},
  {desc:'top action with value 1',                              param:['', '', 'top', 1],                    expected:(result)=>{return ''}},
  {desc:'country action without country name',                  param:['', '', 'country'],                   expected:(result)=>{return 'node ./clawer.js [country] [amount]'}},
  {desc:'country action with void country name',                param:['', '', 'country', 'void_country'],   expected:(result)=>{return 'country void_country not found'}},
  {desc:'country action with country name',                     param:['', '', 'country', 'taiwan'],         expected:(result)=>{return ''}},
  {desc:'country action with country name and amount value',    param:['', '', 'country', 'taiwan', 1],      expected:(result)=>{return ''}},
]

describe('test action parameter', function() {
  this.timeout(10000)
  var check =function(idx){
    it(check_list[idx].desc, function(done) {
      clawer.execute(check_list[idx].param, (success, ret, err)=>{
        if (success ===true){
          done()
          return

        }else{
          expect(err).to.be.equal(
            check_list[idx].expected(err)
          )
        }
        
        done()
      })
    })
  }

  for(var i=0;i<check_list.length;++i){
    check(i)
  }

})