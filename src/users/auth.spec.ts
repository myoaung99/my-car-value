import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({
          email: email,
          password: password,
          id: 1,
        } as unknown as User),
    };

    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    authService = (await module).get(AuthService);
  });

  it('can define the instance for auth service', async () => {
    expect(authService).toBeDefined();
  });
});
