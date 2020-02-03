import { Table, ForeignKey, Column, Model } from "sequelize-typescript";
import User from './User.model'
import Board from './Board.model'

@Table
class UserBoard extends Model<UserBoard> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;
}

export default UserBoard