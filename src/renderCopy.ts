import fs from "fs-extra";
import Mustache from "mustache";

export const renderCopy = async (
	srcPath: string,
	view: any,
	outputPath: string
) => {
	const template = await fs.readFile(srcPath, "utf8");
	const rendered = Mustache.render(template, view);
	await fs.outputFile(outputPath, rendered);
};
