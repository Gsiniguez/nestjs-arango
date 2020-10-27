import * as ArangoDB from "arangojs"

const connection = 'http://root:@localhost:8529'

export const arangoProvider = [
    {
        provide: "ARANGODB",
        useFactory: async () =>
            await new ArangoDB.Database(connection).database("TuCancha"),
    },
]