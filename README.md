# node-postman-docs
###### current version: 1.0.0
## About
This is a small nodejs CLI utility to create a markdown document from a Postman collection run json file.
## Installation
Clone or download.
For global installation, while in root folder:
```
npm install -g
```
## Usage
### flags
#### -i
`required` allows you to specify the filepath to input file
#### -o
(optional) allows  you to name the output file. If not provided, the resulting file will be named the same as the input file with a .md extension appended.
### examples
##### Usage when installed as global package.
```bash
node-postman-docs -i collection.postman_testrun.json -o mytestrun.md
```
##### Usage without installation.
```bash
node index.js -i collection.postman_testrun.json -o mytestrun.md
```