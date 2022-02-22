
##说明：

#安装依赖包：
npm install

#运行
npm run dev

#创建mongodb存储目录
C:\Users\52598
mkdir data
cd data
mkdir db
cd db

#安装并启动mongodb，参考：http://www.runoob.com/mongodb/mongodb-window-install.html
net stop mongodb-service
cd C:\Program Files\MongoDB\Server\4.0\bin
mongod --dbpath C:\Users\52598\data\db
mongo

#备份
mongodump -h localhost:27017 -d forumDB -o C:\Users\52598\data\dump

#恢复
mongorestore -h localhost:27017 -d forumDB c:\data\dump\forumDB --drop