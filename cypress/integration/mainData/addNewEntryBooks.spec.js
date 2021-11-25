/// <reference types="cypress" />

const testSet = [
  {
    id: "name",
    values: ["Luna", "Moon"],
    type: "string",
  },
  {
    id: "number_of_pages",
    values: ["200", "430"],
    type: "number",
  },
  {
    id: "author",
    values: ["Krasik", "Horrik"],
    type: "string",
  },
  {
    id: "was_read",
    values: [true, false],
    type: "checkbox",
  },
  {
    id: "who_read",
    values: ["John", null],
    type: "linkToEntry",
  },
  {
    id: "category",
    values: ["Horror", "Fantasy"],
    type: "dropdownList",
  },
];

const fillInputByType = (field) => {
  switch (field.type) {
    case "checkbox":
      cy.get(`[data-testid=${field.id}]`).click();
      break;
    case "linkToEntry":
      cy.get(`[data-testid=${field.id}]`).click();
      cy.get(`[data-testid=linkToEntry-${field.value.toLowerCase()}]`).click();
      break;
    case "dropdownList":
      cy.get(`[data-testid=${field.id}]`).type("h");
      cy.get(`[data-testid=${field.value.toLowerCase()}]`).click();
      break;
    default:
      cy.get(`[data-testid=${field.id}]`).type(field.value);
  }
};

const fillForm = (set) => {
  set.map((field) => {
    fillInputByType({
      id: field.id,
      value: field.values[0],
      type: field.type,
    });
  });
};

const checkInputByType = (field) => {
  switch (field.type) {
    case "checkbox":
      cy.get(`[data-testid=${field.id}] input`).should(
        field.value ? "be.checked" : "not.be.checked"
      );
      break;
    case "linkToEntry":
      if (field?.value)
        cy.get(`[data-testid=linkToEntry-${field.value.toLowerCase()}]`).should(
          "have.text",
          field.value
        );
      else
        cy.get(
          `[data-testid=linkToEntry-${field.values[0].toLowerCase()}]`
        ).should("not.exist");
      break;
    case "dropdownList":
      cy.get(`[data-testid=${field.id}] input`).should(
        "have.value",
        field.value
      );
      break;
    case "number":
      cy.get(`[data-testid=${field.id}] input`).should(
        "have.value",
        field.value
      );
      break;
    case "string":
      cy.get(`[data-testid=${field.id}] textarea`).should(
        "have.text",
        field.value
      );
      break;
  }
};

const checkForm = (set, index = 0) => {
  set.map((field) => {
    checkInputByType({
      id: field.id,
      value: field.values[index],
      values: field.values,
      type: field.type,
    });
  });
};

const updateInputByType = (field) => {
  switch (field.type) {
    case "string":
      cy.get(`[data-testid=${field.id}] textarea`).clear({ force: true });
      cy.get(`[data-testid=${field.id}]`).type(field.value);
      break;
    case "number":
      cy.get(`[data-testid=${field.id}] input`).clear({ force: true });
      cy.get(`[data-testid=${field.id}]`).type(field.value);
      break;
    case "dropdownList":
      cy.get(`[data-testid=${field.id}]`).type("h");
      cy.get(`[data-testid=${field.value.toLowerCase()}]`).click();
      break;
    case "checkbox":
      cy.get(`[data-testid=${field.id}] input`).uncheck();
      break;
    case "linkToEntry":
      if (field.value) {
        cy.get(`[data-testid=${field.id}]`).click();
        cy.get(
          `[data-testid=linkToEntry-${field.value.toLowerCase()}]`
        ).click();
      } else {
        cy.get(
          `[data-testid=deleteLinkToEntry-${field.values[0].toLowerCase()}]`
        ).click();
      }
      break;
  }
};

const updateForm = (set) => {
  set.map((field) => {
    updateInputByType({
      id: field.id,
      value: field.values[1],
      values: field.values,
      type: field.type,
    });
  });
};

describe("add new entry in library and check", () => {
  const libraryName = "Books";
  it("should create new entry", () => {
    cy.visit("/");
    //add new entry
    cy.get(`#addNewEntryIn${libraryName}`).click();
    fillForm(testSet);
    //save entry
    cy.get(`[data-testid=saveEntry]`).click();
    checkForm(testSet);
    //go main page
    cy.get(`[data-testid=home]`).click();
    //open library
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).click();
    //open entry
    cy.get(
      `[data-testid=linkToEntry-${testSet[0].values[0].toLowerCase()}]`
    ).click();
    checkForm(testSet);
  });

  it("should update new entry", () => {
    //go main page
    cy.get(`[data-testid=home]`).click();
    //open library
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).click();
    //open entry
    cy.get(
      `[data-testid=linkToEntry-${testSet[0].values[0].toLowerCase()}]`
    ).click();
    //edit entry
    cy.get(`[data-testid=edit]`).click();
    checkForm(testSet, 0);

    updateForm(testSet);
    //save updated entry
    cy.get(`[data-testid=saveEntry]`).click();

    checkForm(testSet, 1);
    //go to main page
    cy.get(`[data-testid=home]`).click();
    //enter to library
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).click();
    //enter to entry
    cy.get(
      `[data-testid=linkToEntry-${testSet[0].values[0].toLowerCase()}]`
    ).click();

    checkForm(testSet, 1);
  });

  it("should delete entry", () => {
    //delete entry
    cy.get(`[data-testid=delete]`).click();
    //check if dialog show up
    cy.get(`[data-testid=dialogQuestionTitle]`).should("exist");
    // click disagree and check if dialog disappear
    cy.get(`[data-testid=dialogQuestionDisagree]`).click();
    cy.get(`[data-testid=dialogQuestionTitle]`).should("not.exist");
    //delete entry
    cy.get(`[data-testid=delete]`).click();
    // click agree and check if dialog disappear
    cy.get(`[data-testid=dialogQuestionAgree]`).click();
    cy.get(`[data-testid=dialogQuestionTitle]`).should("not.exist");
    //check if deleted entry exists
    cy.get(
      `[data-testid=linkToEntry-${testSet[0].values[0].toLowerCase()}]`
    ).should("not.exist");
    //check if it's entries list view
    cy.get(`[data-testid=entriesList]`).should("exist");
    //go to main page
    cy.get(`[data-testid=home]`).click();
    //enter to library
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).click();
    //check if deleted entry exists
    cy.get(
      `[data-testid=linkToEntry-${testSet[0].values[0].toLowerCase()}]`
    ).should("not.exist");
  });

  it("should delete library", () => {
    //go main page
    cy.get(`[data-testid=home]`).click();
    //check if library to delete exists
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).should("exist");
    //open library menu
    cy.get(`[data-testid=libraryMenu-${libraryName.toLowerCase()}]`).click();
    //click delete library
    cy.get(`[data-testid=libraryMenuDelete]`).click();
    //check if dialog show up
    cy.get(`[data-testid=dialogQuestionTitle]`).should("exist");
    // click disagree and check if dialog disappear
    cy.get(`[data-testid=dialogQuestionDisagree]`).click();
    cy.get(`[data-testid=dialogQuestionTitle]`).should("not.exist");
    //open library menu
    cy.get(`[data-testid=libraryMenu-${libraryName.toLowerCase()}]`).click();
    //click delete library
    cy.get(`[data-testid=libraryMenuDelete]`).click();
    //check if dialog show up
    // click agree and check if dialog disappear
    cy.get(`[data-testid=dialogQuestionAgree]`).click();
    cy.get(`[data-testid=dialogQuestionTitle]`).should("not.exist");

    //check if deleted library don't exists
    cy.get(`[data-testid=lib-${libraryName.toLowerCase()}]`).should(
      "not.exist"
    );
  });
});
