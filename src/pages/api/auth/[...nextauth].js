import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import argon2 from 'argon2'
import prisma from '../../db'

const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials

        // perform you login logic
        // find out user from db
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })

        if (!user) {
          prisma.$disconnect()
          throw new Error('invalid credentials')
        }

        const isValid = await argon2.verify(user.password, password)

        if (!isValid) {
          prisma.$disconnect()
          throw new Error('invalid credentials')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/pages/login',

    error: '/auth/error'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role
      }

      if (params.user?.id) {
        params.token.uid = params.user.id
      }

      // return final_token
      return params.token
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30
  }
}

export default NextAuth(authOptions)
