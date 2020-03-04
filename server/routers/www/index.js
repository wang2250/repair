const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const common = require('../../libs/common');
const static = require('koa-static');
const request = require('request');
const https=require("https");
let router = new Router();
var loction = 'aaa' ;

router.get('', async ctx=>{
 
    await ctx.render('index',{
        
      });


https.get("https://apis.map.qq.com/ws/location/v1/ip?key=UGNBZ-AIR6D-2DV4Y-HVIHB-JI4OK-XBBCK",function(data){
    var str="";
    data.on("data",function(chunk){
        str+=chunk;//监听数据响应，拼接数据片段
    })
     data.on("end",function(){
         var  loc = JSON.parse(str.toString());
          loction = loc.result.ad_info.city +loc.result.ad_info.district;
          
          
    })
})


  

 });

router.get('found',async ctx=>{
   


 
 ctx.body = {
     "code":1,
     "loct":loction
 }
  
  
});
// router.get('cuidan',async ctx=>{
//     let {num} = ctx.query;
//     try{
//         await ctx.db.query(`UPDATE  admin_table  SET cd='催单' WHERE  onA=${num}`);
//         ctx.body = '成功';
//       }catch(e){
//         ctx.body = '失败';
//       }
// })
// router.get('msg:id',async ctx=>{
//  try{
//     let {txt} = ctx.query;
//     let {id} = ctx.params;
//         id = id.slice(1);
//     let datas =  await ctx.db.query(`SELECT * FROM admin_table WHERE onA=${id}`);
//         datas = datas[0];
//     await ctx.db.query(`INSERT INTO msg_table (name,content,onA,adr) VALUES(?,?,?,?)`,[datas.name,txt,id,datas.address]);
//     await ctx.db.query(`UPDATE  admin_table  SET mssg='true' WHERE  onA=${id}`);
//     ctx.body = '评价成功！感谢您的支持';
//  }catch(e){
//      console.log(e)
//      ctx.body = "评价失败！"
//  }

// })
 module.exports = router.routes();
