import { gql } from "@apollo/client";
export const GET_LIBRARIES_TEMPLATES = gql`
  query {
    librariesTemplates {
      name
      id
      libUUID
      sqlTableName
      columns {
        type
        name
        order
        description
        defaultValue
        columnUUID
        usage
        sqlFieldName
        sqlFieldType
        options {
          value
          index
          default
          dictionaryLibraryUUID
          dictionaryLibraryName
          script
        }
      }
    }
  }
`;

export const GET_LIBRARIES_DATA = gql`
  query {
    librariesData {
      name
      id
      libUUID
      rows {
        rowUUID
        uniqueName
        creationDate
        modificationDate
        columns {
          value
          columnName
          columnUUID
          entryLinks {
            libUUID
            uniqueName
            rowUUID
          }
        }
      }
    }
  }
`;

export const GET_LIBRARIES_DATA_PG = gql`
  query {
    librariesDataPG {
      name
      id
      libUUID
      rows {
        rowUUID
        fe_title
        fe_description
        rowJSON
      }
    }
  }
`;

export const UPDATE_LIBRARY_ROWS_PG = gql`
  mutation updateLibraryRowsData($libraryData: LibraryDataInput) {
    updateLibraryRowsData(libraryDataInput: $libraryData)
  }
`;

export const ADD_LIBRARY_ROWS_PG = gql`
  mutation addLibraryRowsData($libraryData: LibraryDataInput) {
    addLibraryRowsData(libraryDataInput: $libraryData)
  }
`;

export const ADD_LIBRARY_TEMPLATE_PG = gql`
  mutation addLibraryTemplate($libraryTemplate: LibraryTemplateInput) {
    addLibraryTemplate(libraryTemplateInput: $libraryTemplate)
  }
`;
export const UPDATE_LIBRARY_TEMPLATE_PG = gql`
  mutation updateLibraryTemplate($libraryTemplate: LibraryTemplateInput) {
    updateLibraryTemplate(libraryTemplateInput: $libraryTemplate)
  }
`;
