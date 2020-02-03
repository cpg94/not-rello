import { Model, Column, Table, AllowNull, Unique, BelongsToMany, PrimaryKey } from "sequelize-typescript";
import UserBoard from "./UserBoard.model";
import User from "./User.model";

@Table
class Board extends Model<Board> {
  @BelongsToMany(() => User, () => UserBoard)
  users: User[];

  @PrimaryKey
  @Unique
  @Column
  boardId: string;

  @Unique
  @Column
  title: string;

  @AllowNull
  @Column
  description: string;
}

// Board.init(
//   {
//     id: { type: DataTypes.STRING, primaryKey: true },
//     title: {
//       type: DataTypes.STRING
//     },
//     description: {
//       type: DataTypes.STRING
//     }
//   },
//   {
//     sequelize: db,
//     modelName: Models.Board
//   }
// );

export default Board;
