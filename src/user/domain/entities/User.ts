

export interface UserInterface {
    id: string
    name: string
    userName: string
    age?: number

}

export class User implements UserInterface {
    readonly id: string
    readonly name: string
    readonly userName: string
    readonly age?: number

    constructor({ id, name, userName, age }: { id: string, name: string, userName: string, age?: number }) {

        this.id = id
        this.name = name;
        this.userName = userName;
        this.age = age
    }

    static create({ id, name, userName, age }: { id: string, name: string, userName: string, age?: number }): User {
        const user = new User({ id, name, userName, age })
        return user
    }


}