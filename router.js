var fs = require("fs");
var express = require("express");
var student = require("./student.js");

var router = express.Router();

router.get("/student/select", function(req, res) {
	student.selectall(function(err, data) {
		if (err) {
			res.status(500).send("文件未找到");
		} else {
			res.render("students.html", {
				student: data
			});
		}
	});
});

//http://localhost:8888/student/insert
router.get("/student/insert", function(req, res) {
	res.render("insert.html");
});

//http://localhost:8888/student/insertform
router.post("/student/insertform", function(req, res) {
	console.log(req.body);
	student.insert(req.body, function(err, data) {
		if (err) {
			res.status(500).send("服务器内部错误");
		} else {
			res.redirect("/student/select");
		}
	});
});

//http://localhost:8888/student/edit
router.get("/student/edit", function(req, res) {
	student.selectid(req.query.id, function(err, ret) {
		if (err) {
			res.status(500).send("服务器内部错误");
		} else {
			res.render("selectid.html", {
				student: ret
			});
		}
	});
});

router.post("/student/update", function(req, res) {
	student.update(req.body, function(err) {
		if (err) {
			res.status(500).send("服务器内部错误");
		} else {
			res.redirect("/student/select");
		}
	});
});

router.get("/student/remove", function(req, res) {
	student.remove(req.query.id, function(err) {
		if (err) {
			res.status(500).send("服务器内部错误");
		} else {
			res.redirect("/student/select");
		}
	});
});

//上传文件请求
router.post("/student/insertfile", function(req, res) {
	var newName = req.files[0].originalname;
	fs.rename(req.files[0].path, newName, function(err) {
		if (err) {
			res.send(err);
		} else {
			fs.readFile("./" + newName, function(err, data1) {
				if (err) {
					res.status(500).send("服务器内部错误");
				} else {
					fs.readFile("./db.json", function(err, data2) {
						if (err) {
							res.status(500).send("服务器内部错误");
						} else {
							var ndata1 = JSON.parse(data1).student;
							var ndata2 = JSON.parse(data2).student;
							ndata2 = ndata2.concat(ndata1); //合并数组
							var newFile = JSON.stringify({
								student: ndata2
							});
							fs.writeFile("./db.json", newFile, function(err) {
								if (err) {
									res.status(500).send("服务器内部错误");
								} else {
									fs.unlink("./" + newName, function(err) {
										if (err) {
											res.status(500).send("服务器内部错误");
										} else {
											res.redirect("/student/select");
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//http://localhost:8888
router.get("/", function(req, res) {
	res.render("welcome.html");
});

//http://localhost:8888/student
router.get("/student", function(req, res) {
	res.render("welcome.html");
});

//错误地址
router.get("/welcome", function(req, res) {
	res.render("welcome.html");
});

module.exports = router;