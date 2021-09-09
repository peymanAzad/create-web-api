import fs from "fs-extra";
import Mustache from "mustache";
import { BuiltInParserName } from "prettier";
import { prettyfyAndSave } from "./prettyfyAndSave";

export const renderCopy = async (
	srcPath: string,
	view: any,
	outputPath: string,
	parser: BuiltInParserName
) => {
	const template = await fs.readFile(srcPath, "utf8");
	const userentity = Mustache.render(template, view);
	await prettyfyAndSave(userentity, outputPath, parser);
};
