import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import * as Crypto from 'crypto';

@Injectable()
export class BaseBinanceService {
  constructor(private httpService: HttpService) {}

  // base method get
  async binanceGet(apiKey: string, fullUrl: string) {
    const request = this.httpService
      .get(fullUrl, {
        headers: {
          'X-MBX-APIKEY': apiKey,
        },
      })
      .pipe(
        catchError(() => {
          throw new ForbiddenException('Access or secret key invalid');
        }),
      );

    return await firstValueFrom(request);
  }
  // base method get

  //   generate full url
  genUrl(params: string | null, apiSecret: string, endpoint: string) {
    const baseUrl = process.env.BASE_URL_THIRD_PARTY;
    const timestamp = Number(new Date());
    let baseParams = `recvWindow=${process.env.RECVWINDOW}&timestamp=${timestamp}`;
    params = params !== null ? baseParams + params : baseParams;
    console.log(params);
    const signature = this.genSignature(params, apiSecret);
    params += `&signature=${signature}`;
    return `${baseUrl}/${endpoint}?${params}`;
  }
  //   generate full url

  //generate signature
  genSignature(params: string, apiSecret: string) {
    const key = Buffer.from(apiSecret, 'utf8');
    const hmac = Crypto.createHmac('sha256', key);
    hmac.update(params, 'utf8');
    const digest = hmac.digest('hex');
    return digest;
  }
  //generate signature
}
