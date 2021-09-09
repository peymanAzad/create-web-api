import inq from "inquirer";

export const questionInput = async (
	name: string,
	message: string,
	defaultvalue?: string
) =>
	inq.prompt({
		type: "input",
		message,
		default: defaultvalue,
		name,
	});
