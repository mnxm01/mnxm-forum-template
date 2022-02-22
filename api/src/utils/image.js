import uuid from "uuid";
import multiparty from "multiparty";
import fs from "fs";

export const saveFile = (req) => {

  return new Promise((resolve, reject) => {
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./temp/";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {

      var file0 = files['file'];
      var paraname = file0[0].fieldName; //参数名myimg
      var tmpPath = file0[0].path;//uploads\mrecQCv2cGlZbj-UMjNyw_Bz.txt
      var fileSize = file0[0].size; //文件大小

      //找到上传的图片上传之前的名字
      var orgFilename = files.file[0].originalFilename;
      //切割orgFilename 找到图片的扩展名 以证明图片是什么格式的
      //切割后是一个数组，找到数组最后一个
      var formate = orgFilename.split(".");
      //拼接新的图片名称
      var fileName = uuid.v1() + "." + formate[formate.length - 1];

      var fileReadStream = fs.createReadStream(tmpPath);
      var fileWriteStream = fs.createWriteStream('./images/' + fileName);
      fileReadStream.pipe(fileWriteStream); //管道流

      // 删除临时文件夹中的文件
      fs.unlinkSync(tmpPath);

      resolve({
        fileName,
        fields
      });
    });
  })

}