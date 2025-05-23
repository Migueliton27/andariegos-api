import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './graphql-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  authService: any;
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;

    // Aquí generas el JWT con tu servicio AuthService
    const jwt = this.authService.generateJwt(user);

    // Rediriges al frontend con el token en query params
    return res.redirect(`http://localhost:3000?token=${jwt}`);
    }
}
