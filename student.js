var fs = require("fs");

var dbpath = "./db.json";

//查询
exports.selectall = function(callback) {
    fs.readFile(dbpath, function(err, data) {
        if (err) {
            callback(err);
        } else {
            var students = JSON.parse(data).student;
            for (var i = 0; i < students.length; i++) {
                if (students[i].sex == 0) {
                    students[i].sex = "男";
                } else {
                    students[i].sex = "女";
                }
            }
            callback(null, students);
        }
    });
};


//增加
exports.insert = function(pdata, callback) {
    fs.readFile(dbpath, function(err, data) {
        if (err) {
            callback(err);
        } else {
            var students = JSON.parse(data).student;
            students.push(pdata);
            var newFile = JSON.stringify({ student: students });
            fs.writeFile(dbpath, newFile, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null); //没错也要告知一下
                }
            });
        }
    });
};


//查询单个
exports.selectid = function(id, callback) {
	fs.readFile(dbpath,function(err,data) {
		if (err) {
			callback(err);
		}else {
			var students = JSON.parse(data).student;
			var ret = students.find(function(value) {
				return value.id == id;
			});
			callback(null,ret);
		}
	});
};


//修改
exports.update = function(student, callback) {
	fs.readFile(dbpath,function(err,data) {
		if (err) {
			callback(err);
		}else {
			var students = JSON.parse(data).student;
			var ret = students.find(function(value) { //查到的数据
				return value.id == student.id;
			});
			for(var key in student){
				ret[key] = student[key];
			}
			var newFile = JSON.stringify({ student: students });
            fs.writeFile(dbpath, newFile, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null); //没错也要告知一下
                }
            });
		}
	});
};


//删除
exports.remove = function(id, callback) {
	fs.readFile(dbpath,function(err,data){
		if (err) {
			callback(err);
		}else {
			var students = JSON.parse(data).student;
			var ret = students.findIndex(function(value) {
				return value.id == id;
			});
			students.splice(ret, 1);
			var newFile = JSON.stringify({ student: students });
			fs.writeFile(dbpath, newFile, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null); //没错也要告知一下
                }
            });
		}
	});
};