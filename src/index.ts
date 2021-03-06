#!/usr/bin/env node
import * as recast from "recast";
import * as parser from "recast/parsers/typescript";
import fs from "fs";
import glob from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const b = recast.types.builders;

const unknownType = b.typeAnnotation(b.genericTypeAnnotation(b.identifier("unknown"), null));

function fixInternal(node: any) {
    if (
        (!node.accessibility || node.accessibility === "public") &&
        node.comments?.some((value: any) => value.value.includes("@internal"))
    ) {
        delete node.comments;
        node.accessibility = "private";
        if (node.typeAnnotation) node.typeAnnotation = unknownType;
        if (node.parameter?.typeAnnotation) node.parameter.typeAnnotation = unknownType;
        return true;
    }
    return false;
}

function fixInternalMethod(path: any) {
    const { node } = path;
    if (fixInternal(node)) {
        if (node.kind === "method") {
            const newNode = b.classProperty(b.identifier(node.key.name), b.identifier("null"));
            newNode.typeAnnotation = unknownType;
            newNode.value = null;
            newNode.access = "private";
            path.replace(newNode);
            return;
        }
        if (node.kind === "get") node.returnType = unknownType;
        if (node.kind === "set") {
            const param = node.params[0];
            if (param) param.typeAnnotation = unknownType;
            else console.warn(`Setter '${node.key.name}' did not have a parameter`);
        } else {
            node.params = [];
        }
    }
    if (node.kind === "constructor" && node.params) {
        for (const param of node.params) {
            fixInternal(param);
        }
    }
}

function fixFile(file: string, tabWidth: number) {
    const source = fs.readFileSync(file, { encoding: "utf-8" });
    const ast = recast.parse(source, { parser });
    recast.visit(ast, {
        visitClassProperty(path) {
            fixInternal(path.node);
            this.traverse(path);
        },
        visitClassMethod(path) {
            fixInternalMethod(path);
            this.traverse(path);
        },
        visitTSDeclareMethod(path) {
            fixInternalMethod(path);
            this.traverse(path);
        },
        visitExportNamedDeclaration(path) {
            if (path.node.comments?.some((value) => value.value.includes("@internal"))) {
                console.warn(
                    `- Warning: Export definition removed from "${file}", you might want to remove it entirely`
                );
                path.prune();
                return false;
            }
            this.traverse(path);
            return undefined;
        },
    });
    const result = recast.print(ast, { tabWidth }).code;
    if (source !== result) fs.writeFileSync(file, result);
    return result;
}

const { pattern, verbose, "tab-width": tabWidth } = yargs(hideBin(process.argv))
    .command("$0 <pattern>", "Internal .d.ts cleanup", (y) =>
        y.positional("pattern", { default: "./dist/**/*.d.ts", description: "files to process (glob pattern)" })
    )
    .option("verbose", {
        alias: "v",
        default: false,
        type: "boolean",
        description: "Show processed files",
    })
    .option("tab-width", {
        alias: "w",
        default: 4,
        type: "number",
        description: "Use a different tab-width when formatting new code",
    }).argv;

const files = glob.sync(pattern);
for (const file of files) {
    if (verbose) console.log(file);
    fixFile(file, tabWidth);
}
