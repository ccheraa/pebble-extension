/// <reference types="cypress" />

type Files = {
  [k: string]: string | Files;
};
declare namespace Cypress {
  interface Cypress {
    formatDate(date?: Date): string;
  }

  interface Chainable<Subject> {
    getMenuCommand(command: string, options: any): Chainable<Subject>;
    getSubMenu(text: string, options: any): Chainable<Subject>;
    getTreeNode(id: string, options: any): Chainable<Subject>;
    getTreeNode(id: string, options: any): Chainable<Subject>;
    addConnection(name?: string, server?: string, username?: string, password?: string): Chainable<Subject>;
    addCollection(id: string, name: string): Chainable<Subject>;
    getDialogOverlay(): Chainable<Subject>;
    getDialog(): Chainable<Subject>;
    getDialogTitle(): Chainable<Subject>;
    getDialogBody(): Chainable<Subject>;
    getDialogFooter(): Chainable<Subject>;
    getDialogButtons(): Chainable<Subject>;
    getDialogMainButton(): Chainable<Subject>;
    getCheckbox(label, options): Chainable<Subject>;
    findCheckbox(label, options): Chainable<Subject>;
    checked(): Chainable<Subject>;
    notChecked(): Chainable<Subject>;
    addDocument(collection: string, name: string, type?: string): Chainable<Subject>;
    checkDocumentText(document: string, content: string): Chainable<Subject>;
    checkDocumentText(document: string, lines: string[]): Chainable<Subject>;
    dragFileTo(collection: string, filename: string, mimeType?: string): Chainable<Subject>;
    dragFileTo(collection: string, files: string[], mimeType?: string): Chainable<Subject>;
    dragFileTo(collection: string, files: Files, mimeType?: string): Chainable<Subject>;
  }
}