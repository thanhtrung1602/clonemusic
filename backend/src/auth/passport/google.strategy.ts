import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');
    console.log('Google Callback URL:', callbackURL);
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      console.log('profile: ', profile);
      const { displayName, photos, emails } = profile;
      const getLast = displayName.split(' ');
      const lastName = getLast[getLast.length - 1];
      const profileOption = {
        email: emails[0].value,
        name: displayName,
        photos: photos[0].value,
        firstName: displayName,
        lastName,
      };
      const user = await this.authService.validateOAuthLogin(profileOption);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
