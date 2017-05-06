var Doc = function(filename){
	var _this = this;
	this.name = filename;
	this.document = "";
	this.writeLine = function(str){
		_this.document+=str+"\n";
	};
	this.write = function(str){
		_this.document+=str;
	};
	this.save = function(){
		var fs = require("fs");
		fs.writeFileSync(_this.name,_this.document,{encoding:"utf-8"});
	};
	this.saveAs = function(filename){
		var fs = require("fs");
		fs.writeFileSync(filename,_this.document,{encoding:"utf-8"});
	};
	this.toString = function(){
		return _this.document;
	};
};

module.exports = Doc;