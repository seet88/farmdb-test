export const SERVER_IP = "http://192.168.55.37:4000";

export const LOCAL_STORAGE_INIT_TEMPLATES = `[
    {
       "libUUID":"caefce1c-b126-40de-a816-e4038d38b103",
       "name":"Persons",
       "columns":[
          {
             "usage":"title",
             "name":"Name",
             "type":"string",
             "sqlFieldName":"name",
             "options":[
                
             ],
             "columnUUID":"e5a55943-2b1f-481d-9274-f27fdb474bd2"
          }
       ],
       "sqlTableName":"persons"
    },
    {
       "libUUID":"566bf6a6-60ee-440b-a67a-b4154f0af8d7",
       "name":"Books",
       "columns":[
          {
             "usage":"title",
             "name":"Name",
             "type":"string",
             "sqlFieldName":"name",
             "options":[
                
             ],
             "columnUUID":"e77ffe47-74a0-46ca-8dcc-cee505b76e2e"
          },
          {
             "usage":"description",
             "name":"Number of pages",
             "type":"int",
             "sqlFieldName":"number_of_pages",
             "options":[
                
             ],
             "columnUUID":"f9999d4e-3c71-43d1-80df-941683a02c73"
          },
          {
             "usage":"normal",
             "name":"Author",
             "type":"string",
             "sqlFieldName":"author",
             "options":[
                
             ],
             "columnUUID":"0f263e33-7912-465c-a40b-3395d205dec2"
          },
          {
             "usage":"normal",
             "name":"Was read",
             "type":"checkbox",
             "sqlFieldName":"was_read",
             "options":[
                
             ],
             "columnUUID":"c80414d3-022d-4ce9-87ec-4f84442ab7ec"
          },
          {
             "usage":"normal",
             "name":"Who read",
             "type":"libEntry",
             "sqlFieldName":"who_read",
             "options":[
                {
                   "dictionaryLibraryName":"Persons",
                   "dictionaryLibraryUUID":"caefce1c-b126-40de-a816-e4038d38b103"
                }
             ],
             "columnUUID":"48678fc4-51d5-4095-9962-bb89fe5bcbb9"
          },
          {
             "usage":"normal",
             "name":"Category",
             "type":"dropDownList",
             "sqlFieldName":"category",
             "options":[
                {
                   "default":false,
                   "index":1,
                   "value":"Classics"
                },
                {
                   "default":false,
                   "index":2,
                   "value":"Action and Adventure"
                },
                {
                   "default":false,
                   "index":3,
                   "value":"Comic Book"
                },
                {
                   "default":false,
                   "index":4,
                   "value":"Fantasy"
                },
                {
                   "default":false,
                   "index":5,
                   "value":"Historical Fiction"
                },
                {
                   "default":false,
                   "index":6,
                   "value":"Horror"
                },
                {
                   "default":false,
                   "index":7,
                   "value":"Literary Fiction"
                }
             ],
             "columnUUID":"30523198-4d68-43cf-b2be-5fbab00f7f18"
          }
       ],
       "sqlTableName":"books"
    }
 ]`;

export const LOCAL_STORAGE_INIT_DATA = `[
    {
       "name":"Persons",
       "libUUID":"caefce1c-b126-40de-a816-e4038d38b103",
       "rows":[
          {
             "name":"John",
             "rowUUID":"3f6a4d51-806d-48c4-bdb6-f5d9df8d64d7",
             "fe_title":"John",
             "fe_description":""
          }
       ]
    },
    {
       "name":"Books",
       "libUUID":"566bf6a6-60ee-440b-a67a-b4154f0af8d7",
       "rows":[
          {
             "name":"The Hobbit",
             "number_of_pages":"310",
             "author":"J.R.R. Tolkien",
             "was_read":"1",
             "who_read":{
                "value":"71926154-98e3-457e-82b9-2017ce491e6e",
                "entrylinks":[
                   {
                      "rowUUID":"3f6a4d51-806d-48c4-bdb6-f5d9df8d64d7",
                      "columnUUID":"48678fc4-51d5-4095-9962-bb89fe5bcbb9",
                      "rowTitle":"John",
                      "libUUID":"caefce1c-b126-40de-a816-e4038d38b103",
                      "tableName":"persons"
                   }
                ]
             },
             "category":"Fantasy",
             "rowUUID":"cb17806e-4e20-4fc8-9a06-8680ee3d96bf",
             "fe_title":"The Hobbit",
             "fe_description":"310"
          }
       ]
    }
 ]`;

export const LOCAL_STORAGE_INIT_CONFIG = `{"storageType":"localStorage", "isFirstStart":true}`;
