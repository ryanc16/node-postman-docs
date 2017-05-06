# node-postman-docs
---
###### current version: 1.0.0
## About
This is a small nodejs CLI utility to create a markdown document from a Postman collection run json file.
## Usage
### flags
#### -i
`required` allows you to specify the filepath to input file
#### -o
(optional) allows  you to name the output file. If not provided, the resulting file will be named the same as the input file with a .md extension appended.
### example
```bash
node-postman-docs -i collection.postman_testrun.json -o mytestrun.md
```