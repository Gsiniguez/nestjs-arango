import { Global, Module } from '@nestjs/common';
import { arangoProvider } from './arangodb.provider';
import { ArangoDbRepository } from './arangodb.repository';
import { ArangoDbService } from './arangodb.service';

const ArangoDbServiceAlias = {
    provide: "ARANGOSERVICE",
    useExisting: ArangoDbService,
}

@Global()
@Module({
    providers: [...arangoProvider, ArangoDbService],
    exports: [...arangoProvider, ArangoDbService],

})
export class ArangodbModule { }
