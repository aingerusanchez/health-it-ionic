export class Food {
    id: number = new Date().getTime();
    name = '';
    amount = 1;
    expiration: null;

    constructor(
        /* id: number = new Date().getTime(),
        name: string = '',
        amount: number = 1,
        expiration: Date = new Date() */
        data: Partial<Food> = {}
    ) {
        this.id = data.id || this.id;
        this.name = data.name || this.name;
        this.amount = data.amount || this.amount;
        this.expiration = data.expiration;
    }
}
