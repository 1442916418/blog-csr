import { AppDataSource } from '../dataSource'

import { InvitationCode } from '../model/entity/invitation-code'

export const InvitationCodeRepository = AppDataSource.getRepository(InvitationCode)
