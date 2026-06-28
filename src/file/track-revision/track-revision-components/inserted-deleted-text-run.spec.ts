import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { InsertedDeletedTextRun } from "./inserted-deleted-text-run";

describe("InsertedDeletedTextRun", () => {
    describe("#constructor", () => {
        it("should nest a w:del inside a w:ins with delText content", () => {
            const insertedDeletedTextRun = new InsertedDeletedTextRun({
                text: "some text",
                bold: true,
                insertion: { id: 0, author: "Author A", date: "123" },
                deletion: { id: 1, author: "Author B", date: "456" },
            });
            const tree = new Formatter().format(insertedDeletedTextRun);
            expect(tree).to.deep.equal({
                "w:ins": [
                    {
                        _attr: {
                            "w:author": "Author A",
                            "w:date": "123",
                            "w:id": 0,
                        },
                    },
                    {
                        "w:del": [
                            {
                                _attr: {
                                    "w:author": "Author B",
                                    "w:date": "456",
                                    "w:id": 1,
                                },
                            },
                            {
                                "w:r": [
                                    {
                                        "w:rPr": [
                                            {
                                                "w:b": {},
                                            },
                                            {
                                                "w:bCs": {},
                                            },
                                        ],
                                    },
                                    {
                                        "w:delText": [
                                            {
                                                _attr: {
                                                    "xml:space": "preserve",
                                                },
                                            },
                                            "some text",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });
    });
});
