import sinon from 'sinon'
import { StatusCodes } from 'http-status-codes'

import UserController from '../../../src/controller/user'
import SecurityService from '../../../src/services/security-service'

import { User } from '../../../src/model/entity/user'

describe('User Controller', () => {
  const sandbox: any = sinon.createSandbox()
  const username: string = 'test username'
  const email: string = 'test-email@gmail.com'
  const password: string = 'test-password'
  const bio: string = 'test-bio'
  const image: string = 'test-image'
  const token: string = 'some-token'

  const mockUserRepository: any = { save: sandbox.spy(), findOne: sandbox.stub(), update: sandbox.spy() }
  const mockConnection: any = {
    getRepository: sandbox.stub().returns(mockUserRepository)
  }
  const mockHashPassword: any = sandbox.stub(SecurityService, 'hashPassword')
  const mockVerifyHash: any = sandbox.stub(SecurityService, 'verifyHash')
  const mockSecurityService: any = {
    generateToken: sandbox.stub()
  }

  const controller: UserController = new UserController({
    connection: mockConnection,
    securityService: mockSecurityService
  })

  afterEach(() => {
    sandbox.reset()
  })

  test('注册: 哈希密码，回调 save，生成令牌并返回用户', async () => {
    const mockContext: any = {
      request: {
        body: {
          user: {
            username,
            email,
            password,
            bio,
            image
          }
        }
      }
    }

    mockSecurityService.generateToken.returns(token)

    await controller.register(mockContext)

    expect(mockHashPassword.callCount).toBe(1)
    expect(mockUserRepository.save.callCount).toBe(1)

    const user: any = mockUserRepository.save.getCall(0).args[0]

    expect(user.username).toEqual(username)
    expect(user.email).toEqual(email)
    expect(user.bio).toEqual(bio)
    expect(user.image).toEqual(image)

    expect(mockContext.status).toEqual(StatusCodes.CREATED)
    expect(mockContext.body).toEqual({
      user: {
        username,
        email,
        bio,
        image,
        token
      }
    })
  })

  // test.each([
  //   [{ username: '1234' }],
  //   [{ username: '123456789123456789123456789123' }],
  //   [{ email: 'bademail.com' }],
  //   [{ password: '1234' }],
  //   [{ password: '123456789123456789123456789123' }]
  // ])('注册验证用户数据', async (userData: any) => {
  //   const mockContext: any = {
  //     request: {
  //       body: {
  //         user: {
  //           username,
  //           email,
  //           password,
  //           bio,
  //           image
  //         }
  //       }
  //     }
  //   }

  //   Object.assign(mockContext.request.body.user, userData)
  //   expect(controller.register(mockContext)).rejects.toThrow()
  // })

  test.skip('登录: 通过电子邮件查找用户并验证用户/密码', async () => {
    const mockContext: any = {
      request: {
        body: {
          user: {
            email,
            password
          }
        }
      }
    }
    const user: User = new User()
    user.password = password

    mockUserRepository.findOne.resolves(user)
    mockVerifyHash.returns(true)
    mockSecurityService.generateToken.returns(token)

    await controller.login(mockContext)

    expect(mockUserRepository.findOne.getCall(0).args[0]).toEqual({ email })
    expect(mockVerifyHash.getCall(0).args[0]).toEqual(password)
    expect(mockVerifyHash.getCall(0).args[1]).toEqual(password)
    expect(mockSecurityService.generateToken.getCall(0).args[0]).toEqual(user)
    expect(mockContext.status).toEqual(StatusCodes.OK)
    expect(mockContext.body).toEqual({ user: user.toUserJSON(token) })
  })

  test.skip('登录: 找不到用户时登录抛出', async () => {
    const mockContext: any = {
      request: {
        body: {
          user: {
            email,
            password
          }
        }
      },
      throw: sandbox.stub().throws()
    }

    mockUserRepository.findOne.resolves(undefined)
    mockVerifyHash.returns(true)

    expect(controller.login(mockContext)).rejects.toThrow()

    expect(mockUserRepository.findOne.getCall(0).args[0]).toEqual({ email })
    expect(mockVerifyHash.callCount).toEqual(0)
    expect(mockSecurityService.generateToken.callCount).toEqual(0)
  })

  test.skip('登录: 密码验证失败时登录抛出', async () => {
    const mockContext: any = {
      request: {
        body: {
          user: {
            email,
            password
          }
        }
      },
      throw: sandbox.stub().throws()
    }

    mockUserRepository.findOne.resolves({ password })
    mockVerifyHash.returns(false)

    expect(controller.login(mockContext)).rejects.toThrow()

    expect(mockUserRepository.findOne.getCall(0).args[0]).toEqual({ email })
    expect(mockVerifyHash.callCount).toEqual(0)
    expect(mockSecurityService.generateToken.callCount).toEqual(0)
  })

  test.skip('用户信息: 获取当前用户信息', async () => {
    const user: User = new User()

    const mockContext: any = {
      state: {
        user,
        token
      }
    }

    await controller.getCurrentUser(mockContext)

    expect(mockContext.status).toEqual(StatusCodes.OK)
    expect(mockContext.body).toEqual({ user: user.toUserJSON(token) })
  })

  test.skip('更新用户: 从状态中获取用户，分配新的道具并在用户报告中调用更新', async () => {
    const id: number = 123
    const newUsername: string = 'new username'
    const newEmail: string = 'new-email@gmail.com'
    const newBio: string = 'newBio'
    const newImage: string = 'new-image'

    const oldUser: User = new User()
    oldUser.id = id
    oldUser.email = email
    oldUser.username = username
    oldUser.bio = bio
    oldUser.image = image

    const mockContext: any = {
      state: {
        user: oldUser,
        token
      },
      request: {
        body: {
          user: {
            username: newUsername,
            email: newEmail,
            bio: newBio,
            image: newImage
          }
        }
      }
    }

    await controller.updateUser(mockContext)

    expect(mockUserRepository.update.getCall(0).args[0]).toEqual(id)
    const user: any = mockUserRepository.update.getCall(0).args[1]
    expect(user.username).toEqual(newUsername)
    expect(user.email).toEqual(newEmail)
    expect(user.bio).toEqual(newBio)
    expect(user.image).toEqual(newImage)
    expect(mockContext.status).toEqual(StatusCodes.OK)
  })
})
