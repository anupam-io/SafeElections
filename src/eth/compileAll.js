var path = require('path');
var solc = require('solc');
var fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.mkdirSync(buildPath);

fs.readdir(path.resolve(__dirname, 'contracts'), function (err, files) {
	//listing all files using forEach
	files.forEach(function (fileName) {
		// Compile each .sol file and dump output in JSON format
		console.log('Compiling ', fileName, '...');
		const filePath = path.resolve(__dirname, 'contracts', fileName);
		const source = fs.readFileSync(filePath, 'utf-8');

		var input = {
			language: 'Solidity',
			sources: {
				fileName: {
					content: source
				}
			},
			settings: {
				outputSelection: {
					'*': {
						'*': ['*']
					}
				}
			}
		};
		
		var output = JSON.parse(solc.compile(JSON.stringify(input)));		
	
		for (let contract in output.contracts.fileName) {
			fs.outputJSONSync(
				path.resolve(buildPath, contract+'.json'),
				output.contracts.fileName[contract]
			);
		}

		console.log(fileName, ' compiled.');
	});
});
