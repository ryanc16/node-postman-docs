#!/usr/bin/env node
var flags = {};
process.argv.slice(2).forEach(function(o,i,a){
	if(o.match(/^-[a-zA-Z]+/g))
		flags[o.replace('-','')] = a[i+1];
});
var infile = flags.i;
var fs = require("fs");
if(!fs.existsSync(infile)){
	console.log("Provided json file not found!");
	return;
}
var outfile = ("o" in flags)?flags.o:infile+".md";
var MD = require("./markdown");
var Doc = require("./document");
Doc = new Doc(outfile);
var pm_json = fs.readFileSync(infile,"utf-8");
pm_json = JSON.parse(pm_json);
var requests = pm_json.requests;
var collection = pm_json.collection;
var coll_reqs = [];
var results = [];
if(collection.order.length>0){
	for(var i=0;i<collection.order.length;i++){
		for(var j=0;j<collection.requests.length;j++){
			if(collection.order[i] == collection.requests[j].id)
				coll_reqs.push(collection.requests[j]);
			if(collection.order[i] == pm_json.results[j].id)
				results.push(pm_json.results[j]);
		}
	}
}
else{
	for(var j=0;j<collection.requests.length;j++){
		coll_reqs.push(collection.requests[j]);
		results.push(pm_json.results[j]);
	}
}
Doc.writeLine(MD.h1(pm_json.name));
Doc.writeLine(MD.hr());
Doc.writeLine(MD.h6()+MD.bold("ID:")+pm_json.id);
Doc.write(MD.h5()+"Delay: "+pm_json.delay);
Doc.writeLine(" - Count: "+pm_json.count);
Doc.writeLine(MD.h4("Collection"));
Doc.writeLine(MD.hr());
Doc.writeLine(MD.h6()+MD.bold("ID:")+collection.id);
Doc.writeLine(MD.h5()+MD.bold("Name:")+collection.name);
Doc.writeLine(MD.h5()+MD.bold("Description:")+collection.description);
Doc.writeLine(MD.h5()+MD.bold("Items:")+collection.requests.length);
Doc.writeLine(MD.h3("Summary"))
Doc.writeLine(MD.hr());
Doc.writeLine(MD.h5()+MD.bold("Total pass:")+pm_json.totalPass);
Doc.writeLine(MD.h5()+MD.bold("Total fail:")+pm_json.totalFail);
Doc.writeLine(MD.h5()+MD.bold("Total time:")+pm_json.totalTime+"ms");
Doc.writeLine(MD.h3("Requests")+" - "+requests.length);
Doc.writeLine(MD.hr());
for(var i=0;i<coll_reqs.length;i++){
	var request = coll_reqs[i];
	var tests = [];
	var num_passed = 0;
	Object.keys(results[i].tests).forEach(function(oo,ii){
		var test = [];
		test.push(oo);
		test.push(MD.bold((results[i].tests[oo])?"PASS":"FAIL"));
		if(test[1]) num_passed++;
		tests.push(test);
	});
	Doc.writeLine(MD.h5()+MD.bold((i+1)+". ")+MD.code(request.name));
	Doc.writeLine(MD.h5()+MD.bold(request.method)+MD.href(request.url,request.url));
	Doc.writeLine(MD.h5()+MD.bold("Description:")+request.description);
	Doc.writeLine(MD.h5()+MD.bold("Headers:"));
	Doc.writeLine(MD.codeblock(request.headers,"http"));
	Doc.writeLine(MD.h5()+MD.bold("Data:")+request.dataMode);
	Doc.writeLine(MD.codeblock(request.data,"javascript"));
	Doc.writeLine(MD.h5()+MD.bold("Tests:")+tests.length);
	Doc.writeLine(MD.codeblock(request.tests,"javascript"));
	Doc.writeLine(MD.h5("Results:"));
	Doc.writeLine(MD.bold("Status:")+results[i].responseCode.code+" - "+results[i].responseCode.name);
	Doc.writeLine(MD.bold("Time:")+results[i].time);
	Doc.writeLine(MD.bold("Tests Passed:")+num_passed+"/"+tests.length);
	Doc.writeLine(MD.table(["Test Name","Result"],tests));
}
Doc.save();