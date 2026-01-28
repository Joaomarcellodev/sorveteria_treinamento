export class Money {
  private readonly value: number

  constructor(value: number) {
    if (value < 0) {
      throw new Error('value monetário não pode ser negativo')
    }

    this.value = Number(value.toFixed(2))
  }


  getvalue(): number {
    return this.value
  }


  addMoney(outro: Money): Money {
    return new Money(this.value + outro.value)
  }

  subttractMoney(outro: Money): Money {
    if (outro.value > this.value) {
      throw new Error('The monetary result cannot be negative.')
    }

    return new Money(this.value - outro.value)
  }


  multiplyMoney(quantidade: number): Money {
    if (quantidade <= 0) {
      throw new Error('Invalid quantity for multiplication.')
    }

    return new Money(this.value * quantidade)
  }

 
  greatherThan(outro: Money): boolean {
    return this.value > outro.value
  }

  Equal(outro: Money): boolean {
    return this.value === outro.value
  }

  formateBR(): string {
    return this.value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }
}