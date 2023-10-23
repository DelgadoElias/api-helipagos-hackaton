class Person {
    name: string;
    email: string;
    stack: string;
    isConfirmed: boolean;
    isPresent: boolean;
    isSuccessfully: boolean;
    
    constructor(name: string, email: string, stack: string = "flutter"){
        this.name = name;
        this.email = email;
        this.stack = stack;
        this.isConfirmed = false;
        this.isPresent = false;
        this.isSuccessfully = false;
    }
}

export default Person