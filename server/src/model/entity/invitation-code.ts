import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('invitation_code')
export class InvitationCode {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  code!: string

  @Column({ default: false })
  isUse!: Boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  toJSON() {
    return { code: this.code, isUse: this.isUse }
  }
}
