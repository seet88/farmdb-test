/// <reference types="cypress" />

describe("creating new library", () => {
  beforeEach(() => {
    cy.visit("/creator");
  });
  it("should create new library with 1 field", () => {
    cy.get("#name").type("SomeLibraryName");
    const fieldName = "SomeFieldName";
    cy.contains("Field").click();
    cy.contains("+").click();
    cy.get("#name").type(fieldName);
    cy.get("#sqlFieldType").type("text");
    cy.get("#description").type("someDescription");
    cy.get("#defaultValue").type("someDefaultValue");
    cy.get("#usage").select("Title");
    cy.get("#submitFields").click();
    cy.contains(fieldName);
  });
});
