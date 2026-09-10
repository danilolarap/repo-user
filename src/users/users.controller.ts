import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email: string;
}

    @Controller('users')
    export class UsersController {

        private Users: User[] = [
            {
                id: '1',
                name: 'Danilo',
                email: 'danilolarap@correo.com'
            },
            {
                id: '2',
                name: 'María Victoria',
                email: 'mvictoria@correo.com'
            },
            {
                id: '3',
                name: 'Luis Sebastián',
                email: 'luis.diaz@correo.com'
            },
            {
                id: '4',
                name: 'David Andrés',
                email: 'david.cabrera@correo.com'
            },
            {
                id: '5',
                name: 'Jorge Alejandro',
                email: 'jorge.parra@correo.com'
            },
            {
                id: '6',
                name: 'Karol Isabella',
                email: 'karol.isabella@correo.com'
            },
            {
                id: '7',
                name: 'Josue David',
                email: 'josue.david@correo.com'
            },
            {
                id: '8',
                name: 'Edgar Arteaga',
                email: 'edgar.arteaga@correo.com'
            },
            {
                id: '9',
                name: 'Cristian Yela',
                email: 'cristian.yela@correo.com'
            },
            {
                id: '10',
                name: 'Gabriela Benitez',
                email: 'gabriela.benitez@correo.com'
            }
        ];

        @Get('')
        getAllUser() {
            return this.Users;
        }

        @Get(':id')
        getUserById(@Param('id') id: string) {
            console.log('.:: User ID:', id);
            const user = this.Users.find((user) => user.id === id);
            console.log('.:: usuario buscado:', user);
            return user;
        }

        @Get('search/:name')
        getUserUserByName(@Param('name') name: string) {
            const data = this.Users.find((user) => user.name === name);
            return { result: data?.email };
        }

        @Post()
        createUser(@Body() userPayload: User) {
            console.log('.:: user: ', userPayload);
            // user.id = no debe existir 
            // user.correo = no de existir
            // si el usuario existe -> retornar "el usuario ya se encuentra registrado"
            const user = this.Users.find((user) => user.id === userPayload.id || user.email === userPayload.email);
            if (user) {
                return {
                    msg: "El usuario ya se encuentra registrado"
                };
            }
            this.Users.push(userPayload);
            return {
                msg: "Usuario creado",
                data: userPayload
            };
        }

        @Delete(':id')
        deleteUser(@Param('id') id: string) {
            console.log('.:: User ID :', id);
            const position = this.Users.findIndex(user => user.id === id);
            console.log('.:: position ', position);
            if (position === -1) {
            return {
                msg: "No existe el ID",
            }
        }

        this.Users.splice(position, 1);

        return {
            msg: "Usuario eliminado",
        }
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userChanges: User) {
        console.log('.:: UserID Update :', id);
        console.log('.:: userChanges: ', userChanges);
        return {
            msg: "Usuario actualizado",
            data: {}
        }
    }

}