import { Module } from '@nestjs/common';

import { AxiosAdapter } from './adapters/axios.adapter';
import { mysqlProviders } from './providers/mysql.providers';
import { TokenBlacklistService } from './services/token-blacklist.service';

@Module({
  controllers: [],
  providers: [
    AxiosAdapter,
    TokenBlacklistService,
    ...mysqlProviders
  ],
  exports: [
    AxiosAdapter,
    TokenBlacklistService,
    ...mysqlProviders,
    'DATA_SOURCE'
  ],
})
export class GlobalModule {}
