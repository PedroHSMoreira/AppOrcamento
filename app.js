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

    getId() { // Gerencia o id das despesas
        let nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }

    setStorage(expense) { // Armazena a despesa em localStorage
        let id = this.getId()

        localStorage.setItem(`${id}`, JSON.stringify(expense)) // Transforma o objeto literal em um json string

        localStorage.setItem('id', id)
    }

    getAllExpense() {
        let expenses = []

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) { // Bucas as despesas por id
            let expense = JSON.parse(localStorage.getItem(i)); // Transforma um json em objeto literal
            if (expense === null) {
                continue
            }
            expenses.push(expense) //Adiciona todas as despesas no array
        }
        return expenses
    }
}
/*------------------------------ 
    Controllers da aplicação 
*/

let db = new DB()

// Cadastrando nova despesa
function registerExpense() {
    let year = document.querySelector('#ano') // Acessando os elementos do formulário 
    let month = document.querySelector('#mes')
    let day = document.querySelector('#dia')
    let type = document.querySelector('#tipo')
    let description = document.querySelector('#descricao')
    let val = document.querySelector('#valor')
    let button = document.querySelector('#btnAdd')

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
        messageAlert('success', 'Despesa cadastrada com sucesso!')
        console.log('Válido')
    } else {
        console.log('Inválido')
        messageAlert('danger', 'Não foi possível cadastrar sua despesa!')
    }
}

function messageAlert(type, message) { // Alert 
    let alert = document.querySelector('#messageAlert')

    if (alert.classList.contains('fade')) { // Verificando se o alert está em modo fade(escondido)
        alert.classList.remove('fade')
        setTimeout(() => {
            alert.classList.add('fade')
        }, 3000); // Visível por 3s
    }

    alert.classList.add(`alert-${type}`)
    alert.textContent = message
}

function getList() {
    let expenses = []

    expenses = db.getAllExpense()

    let [ano, mes, dia, tipo, descricao] = expenses

    // Iniciar a demonstracao na view
}