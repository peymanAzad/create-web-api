import fs from "fs-extra";
import prittier, { BuiltInParserName } from "prettier";

export const prettyfyAndSave = (
	value: string,
	filePath: string,
	parser: BuiltInParserName
) => {
	const pretty = prittier.format(value, { parser });
	fs.outputFile(filePath, pretty);
};
