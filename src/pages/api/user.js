import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method === 'POST') {
        const { email, password, name, nip } = req.body;
        const passwordHash = await argon2.hash(password);

        const data = {
            email,
            password: passwordHash,
            name,
            nip
        }

        // console.log(await argon2.verify(passwordHash, password));

        const user = await prisma.user.create({
            data,
        });
        res.json(user);
    } else if (req.method === 'GET') {
        const users = await prisma.user.findMany();
        
        return res.status(200).json(users);
    }
}