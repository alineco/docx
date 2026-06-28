/**
 * Inserted-then-deleted text run module for track changes.
 *
 * Represents a tracked change layered on top of another tracked change: text
 * that one reviewer inserted and a second reviewer subsequently deleted.
 */
import { XmlComponent } from "@file/xml-components";

import { DeletedTextRun } from "./deleted-text-run";
import { type IRunOptions } from "../../paragraph/run/run";
import { ChangeAttributes, type IChangedAttributesProperties } from "../track-revision";

export type IInsertedDeletedTextRunOptions = IRunOptions & {
    readonly insertion: IChangedAttributesProperties;
    readonly deletion: IChangedAttributesProperties;
};

export class InsertedDeletedTextRun extends XmlComponent {
    public constructor(options: IInsertedDeletedTextRunOptions) {
        super("w:ins");
        const { insertion, deletion, ...runOptions } = options;
        this.root.push(
            new ChangeAttributes({
                id: insertion.id,
                author: insertion.author,
                date: insertion.date,
            }),
        );
        this.addChildElement(new DeletedTextRun({ ...runOptions, ...deletion }));
    }
}
