var Markdown = {
	h1:function(str=""){
		if(str=="") return "# ";
		else return "# "+str.trim()+" ";
	},
	h2:function(str=""){
		if(str=="") return "## ";
		else return "## "+str.trim()+" ";
	},
	h3:function(str=""){
		if(str=="") return "### ";
		else return "### "+str.trim()+" ";
	},
	h4:function(str=""){
		if(str=="") return "#### ";
		else return "#### "+str.trim()+" ";
	},
	h5:function(str=""){
		if(str=="") return "##### ";
		else return "##### "+str.trim()+" ";
	},
	h6:function(str=""){
		if(str=="") return "###### ";
		else return "###### "+str.trim()+" ";
	},
	hr:function(){
		return "---";
	},
	bold:function(str){
		return " **"+str.trim()+"** ";
	},
	italic:function(str){
		return " _"+str.trim()+"_ ";
	},
	strike:function(str){
		return " ~~"+str.trim()+"~~ ";
	},
	blockquote:function(str){
		return "> "+str.trim();
	},
	code:function(str){
		return "`"+str.trim()+"`";
	},
	codeblock:function(str,lang=""){
		if(str==null) return "";
		else if(typeof str == "object"){
			var new_str = ""
			str.forEach(function(o,i){
				if(o.enabled) new_str+="["+o.type+"] "+o.key+" = "+((o.value==null)?"":o.value)+"\n";
			});
			str = new_str;
		}
		if(str!="") str = str.replace(/^[\s\n]+|[\s\n]+$/g, '')+"\n";
		return "```"+lang+"\n"+str+"```";
	},
	href:function(url,str=""){
		return "["+str.trim()+"]"+"("+url+")";
	},
	table:function(headers,rows){
		var table = "";
		headers.forEach(function(o,i){
			table+="| "+o.trim()+" ";
		});
		table+="|\n";
		headers.forEach(function(o,i){
			table+="| --- ";
		});
		table+="|\n";
		rows.forEach(function(o,i){
			o.forEach(function(oo,ii){
				table+="| "+oo.trim()+" ";
			});
			table+="|\n";
		});
		return table;
	}
};
module.exports = Markdown;