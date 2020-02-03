import { Table, Model, Unique, Column, AllowNull, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import Board  from './Board.model'
import UserBoard from "./UserBoard.model";

@Table
class User extends Model<User> {
  @BelongsToMany(() => Board, () => UserBoard)
  boards: Board[];

  @PrimaryKey
  @Unique
  @Column
  userId: string;

  @Unique
  @Column
  email: string;

  @Column
  hash: string;

  @AllowNull
  @Column
  description: string;
}

export default User