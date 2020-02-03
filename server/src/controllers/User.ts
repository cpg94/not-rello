import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.model';
import uuid from 'uuid/v4'
import { Op } from 'sequelize';

const SALT_ROUNDS = 10

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, bio } = req.body
        if(email && password){
            const users = await User.findOne({ where: { email: { [Op.eq]: email }}})
            if(users){
                res.status(200).send({ error: true, message: 'User exists with email'})
            }
            const hash = await bcrypt.hash(password, SALT_ROUNDS)
            const user = await User.create({
                userId: uuid(),
                email,
                bio: bio || null,
                hash
            })
            res.status(200).send({ error: false, message: "User created.", data: user })
            return
        }
        res.status(200).send({ error: true, message: "No Email or Password provided."})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

export const find = async (req: express.Request, res: express.Response, remove: boolean = false) => {
    try {
            const foundUser = await User.findOne({ where: { id: { [Op.eq]: req.params.id }}})
            const boards = await foundUser.$get('boards')
            if(foundUser && !remove){
                res.status(200).send({ error: false, message: 'Found user.', data: { foundUser, boards }})
                return
            } else if (foundUser && remove){
                await foundUser.$remove('id', foundUser)
                res.status(200).send({ error: false, message: 'Deleted user.', data: foundUser})
                return
            }

            res.status(200).send({ error: true, message: "Could not find user with that id"})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

export const get = async (_: express.Request, res: express.Response) => {
    try {
            const foundUsers = await User.findAll()
            if(foundUsers && foundUsers.length){
                res.status(200).send({ error: false, message: 'Found users.', data: foundUsers })
                return
            }

            res.status(200).send({ error: true, message: "Could not find users."})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}

export const update = async (req: express.Request, res: express.Response) => {
    try {
        const { bio } = req.body
        if(bio){
            const userToUpdate = await User.findOne({ where: { id: { [Op.eq]: req.params.id }}})
            if(userToUpdate){
                const updatedUser = await userToUpdate.update({ bio })
                res.status(200).send({ error: false, message: "User updated.", data: updatedUser })
                return
            }
            res.status(200).send({ error: true, message: "Could not find user with that id."})
            return
        }
        res.status(200).send({ error: true, message: "No Bio provided."})
    } catch (e) {
        res.status(503).send({ error: true, message: e.toString() })
    }
}