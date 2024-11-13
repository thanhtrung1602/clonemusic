import {Inject, Injectable} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS') private readonly redisClient: Redis) {
    }

    async set(key: string, value: any) {
        const LRU_CACHE_LIMIT = 1000;
        if (
            typeof key !== 'string' ||
            (typeof value !== 'string' && typeof value !== 'number')
        ) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            } else {
                throw new TypeError(
                    'Key must be a string and value must be a string or number',
                );
            }
        }

        await this.redisClient.set(key, value);
        await this.redisClient.lpush('lruList', key);

        await this.redisClient.ltrim('lruList', 0, LRU_CACHE_LIMIT - 1);
        const size = await this.redisClient.llen('lruList');
        if (size > LRU_CACHE_LIMIT) {
            const lruKey = await this.redisClient.rpop('lruList');
            if (lruKey) {
                await this.redisClient.del(lruKey);
            }
        }
    }

    async get(key: string) {
        const value = await this.redisClient.get(key);
        return value;
    }
}
