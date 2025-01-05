export default class Order {
  constructor(
    public userId: string,
    public item: string,
    public amount: number
  ) {}
}
