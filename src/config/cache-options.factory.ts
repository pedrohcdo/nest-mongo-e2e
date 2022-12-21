import { CacheOptionsFactory, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CacheModuleOptions } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

@Injectable()
export class RedisOptionsFactory implements CacheOptionsFactory {
	constructor(private configService: ConfigService) {}

	createCacheOptions(): CacheModuleOptions {
		let cacheConfig = this.configService.get('cache')
		return {
			store: redisStore,
			host: cacheConfig.host,
			port: cacheConfig.port,
			auth_pass: cacheConfig.pass,
			ssl: true,
			abortConnect: false,
		}
	}
}
