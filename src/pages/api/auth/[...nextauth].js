import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'password',
                },
            },
            async authorize(credentials, req) {
                if (credentials.username !== '' && credentials.password !== '') {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.username,
                        },
                    })

                    if (user.password != null && credentials.password != null) {
                        if (await bcrypt.compare(credentials.password, user.password)) {
                            return user
                        }
                    }
                }

                return null
                // if (
                //     credentials.username === 'admin@example.com' &&
                //     credentials.password === 'admin'
                // ) {
                //     return {
                //         id: 2,
                //         name: 'Admin',
                //         email: 'admin@example.com',
                //     }
                // }
                // return null
            },
        }),
    ],
    callbacks: {
        async session({ session, user, token }) {
            if (token) {
                session.id = token.id
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
    },
    secret: 'l;sakdjfdasl;kfjasdl;fksajdfsladkj',
    jwt: {
        secret: 'l;ksdjfsla;dkfjsdal;fksadjflkdjflsadkfjsdal;kfj',
        // encryption: true,
    },
})
