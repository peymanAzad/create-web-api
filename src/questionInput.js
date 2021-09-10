const inq = require("inquirer");

const questionInput = async (name, message, defaultvalue) =>
	inq.prompt({
		type: "input",
		message,
		default: defaultvalue,
		name,
	});
exports.questionInput = questionInput;
