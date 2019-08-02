// Models da aplicação 
class Expense {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano,
            this.mes = mes,
            this.dia = dia,
            this.tipo = tipo,
            this.descricao = descricao,
            this.valor = valor
    }

    validator() {
        for (const i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    } 
}

// Classe que simula um banco de dados com localStorage
class DB {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getId() {
        let nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }

    setStorage(expense) {
        let id = this.getId()

        localStorage.setItem(`${id}`, JSON.stringify(expense))

        localStorage.setItem('id', id)
    }
}
/*------------------------------ 
    Controllers da aplicação 
*/

let db = new DB()

// Cadastrando nova despesa
function registerExpense() {
    let year = document.querySelector('#ano') // Mais próximo do jquery
    let month = document.querySelector('#mes')
    let day = document.querySelector('#dia')
    let type = document.querySelector('#tipo')
    let description = document.querySelector('#descricao')
    let val = document.querySelector('#valor')

    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        val.value
    )

    if (expense.validator()) {
        db.setStorage(expense)
        console.log('Válido')
    } console.log('Inválido')
}

