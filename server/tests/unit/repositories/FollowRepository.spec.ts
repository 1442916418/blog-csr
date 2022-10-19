import FollowRepository from '../../../src/repositories/FollowRepository'
import sinon from 'sinon'
import { User } from '../../../src/entities/User'

describe('Follow Repository', () => {
  const sandbox: any = sinon.createSandbox()
  const repository: FollowRepository = new FollowRepository()
  const mockCount: any = sandbox.stub(repository, 'count')

  afterEach(() => {
    sandbox.reset()
  })

  test.each([
    [0, false],
    [1, true],
    [5, true]
  ])('favorited returns count converted to boolean', async (count: number, expectedResult: boolean) => {
    const follower: User = new User()
    const following: User = new User()
    mockCount.resolves(count)

    const result: boolean = await repository.following(follower, following)

    expect(result).toEqual(expectedResult)
    expect(mockCount.getCall(0).args[0]).toEqual({ follower, following })
  })
})
