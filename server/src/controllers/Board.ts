import express from 'express'
import Board from '../models/Board.model';
import { Op } from 'sequelize';
import uuid from 'uuid/v4';
import UserBoard from '../models/UserBoard.model';

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description = null, user } = req.body
        if(title && user){
            const existingBoard = await Board.findOne({ where: { title: { [Op.eq]: title }} })
            
            if(existingBoard){
                res.status(200).send({ error: true, message: 'Board exists with that title'})
            }

            const id = uuid()            
            const board = await Board.create({
                id,
                title,
                description
            })
            
            const createdBoard = await UserBoard.create({
                boardId: id,
                userId: user
            })
            
            res.status(200).send({ error: false, message: "Board created.", data: { board, createdBoard } })
            return
        }
        res.status(200).send({ error: true, message: "No Title or Password provided."})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

export const find = async (req: express.Request, res: express.Response, remove: boolean = false) => {
    try {
            const foundBoard = await Board.findOne({ where: { boardId: { [Op.eq]: req.params.id}}})
            const users = foundBoard.$get('users')
            console.log({ users })
            if(foundBoard && !remove){
                res.status(200).send({ error: false, message: 'Found user.', data: foundBoard})
                return
            } else if (foundBoard && remove){
                // await foundBoard.$remove()
                res.status(200).send({ error: false, message: 'Deleted user.', data: foundBoard})
                return
            }

            res.status(200).send({ error: true, message: "Could not find user with that id"})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

export const get = async (_: express.Request, res: express.Response) => {
    try {
            const foundBoards = await Board.findAll()
            if(foundBoards && foundBoards.length){
                res.status(200).send({ error: false, message: 'Found users.', data: foundBoards })
                return
            }

            res.status(200).send({ error: true, message: "Could not find users."})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

// export const update = async (req: express.Request, res: express.Response) => {
//     try {
//         const { bio } = req.body
//         if(bio){
//             const userToUpdate = await User.findById(req.params.id)
//             if(userToUpdate){
//                 const updatedUser = await userToUpdate.update({ bio })
//                 res.status(200).send({ error: false, message: "User updated.", data: updatedUser })
//                 return
//             }
//             res.status(200).send({ error: true, message: "Could not find user with that id."})
//             return
//         }
//         res.status(200).send({ error: true, message: "No Bio provided."})
//     } catch (e) {
//         res.status(503).send({ error: true, message: e.toString() })
//     }
// }