const fs = require("fs-extra");
const Mustache = require("mustache");

const renderCopy = async (srcPath, view, outputPath) => {
	const template = await fs.readFile(srcPath, "utf8");
	const rendered = Mustache.render(template, view);
	await fs.outputFile(outputPath, rendered);
};
exports.renderCopy = renderCopy;
