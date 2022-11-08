import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method === 'POST') {

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json(user);
    }
}