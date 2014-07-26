/**
 * Created by ChiHwan on 2014. 7. 26..
 */

var fs = require('fs');


exports.fileUpload = function(req, res){

    console.log(req.files.uploadFile.path);
    fs.readFile(req.files.uploadFile.path, function(error, data){
        if(error){
            throw err;
        }else {
            res.redirect("back");
        }
        /*
            // 파일 저장
            var filePath = __dirname + "/files/" + req.files.uploadFile.name;

            console.log(filePath);
            fs.writeFile(filePath, data, function(error){
                if(error){
                    throw err;
                }else {
                    res.redirect("back");
                }
            });
        */
    });
};