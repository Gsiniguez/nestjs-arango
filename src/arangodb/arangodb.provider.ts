import * as ArangoDB from "arangojs"
import { ConfigService } from "@nestjs/config";

export const arangoProvider = [
    {
        provide: "ARANGODB",
        useFactory: async (config: ConfigService) =>
            await new ArangoDB.Database(config.get<string>("DATABASE_URL")).database(config.get<string>("DATABASE_NAME")),
        inject: [ConfigService]
    },
]