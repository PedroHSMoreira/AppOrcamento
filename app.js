// Models da aplicação
class Expense {
  constructor(year, month, day, type, description, val) {
    (this.year = year),
      (this.month = month),
      (this.day = day),
      (this.type = type),
      (this.description = description),
      (this.val = val)
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
    // Gerencia o id das despesas
    let nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1
  }

  setStorage(expense) {
    // Armazena a despesa em localStorage
    let id = this.getId()

    localStorage.setItem(`${id}`, JSON.stringify(expense)) // Transforma o objeto literal em um json string

    localStorage.setItem('id', id)
  }

  getAllExpense() {
    let expenses = []

    let id = localStorage.getItem('id')

    for (let i = 1; i <= id; i++) {
      // Busca as despesas por id
      let expense = JSON.parse(localStorage.getItem(i)) // Transforma um json em objeto literal
      if (expense === null) {
        continue
      }
      expenses.push(expense) //Adiciona todas as despesas no array
    }
    return expenses
  }

  search(expense) {
    let filtredExpenses = []

    filtredExpenses = this.getAllExpense()
    console.log(expense)
    console.log(filtredExpenses)
    // ano
    if (expense.year != '') {
      filtredExpenses = filtredExpenses.filter(el => el.year == expense.year)
      console.log(filtredExpenses)
    }
    // Mês
    if (expense.month != '') {
      filtredExpenses = filtredExpenses.filter(el => el.month == expense.month)
    }
    // Dia
    if (expense.day != '') {
      filtredExpenses = filtredExpenses.filter(el => el.day == expense.day)
    }
    // Tipo
    if (expense.type != '') {
      filtredExpenses = filtredExpenses.filter(el => el.type == expense.type)
    }
    // Descrição
    if (expense.description != '') {
      filtredExpenses = filtredExpenses.filter(
        el => el.description == expense.description
      )
    }
    // Valor
    if (expense.val != '') {
      filtredExpenses = filtredExpenses.filter(el => el.val == expense.val)
    }

    return filtredExpenses
  }
}
/*------------------------------ 
    Controllers da aplicação 
*/

let db = new DB()

// Cadastrando nova despesa
function registerExpense() {
  let year = document.querySelector('#year') // Acessando os elementos do formulário
  let month = document.querySelector('#month')
  let day = document.querySelector('#day')
  let type = document.querySelector('#type')
  let description = document.querySelector('#description')
  let val = document.querySelector('#val')

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
    // Limpando os campos do formulário
    year.value = ''
    month.value = ''
    day.value = ''
    type.value = ''
    description.value = ''
    val.value = ''
  } else {
    console.log('Inválido')
    messageAlert(
      'danger',
      'Não foi possível cadastrar sua despesa! Verifique se os campos foram preenchidos!'
    )
  }
}

function messageAlert(type, message) {
  // Alert
  let alert = document.querySelector('#messageAlert')

  if (alert.classList.contains('fade')) {
    // Verificando se o alert está em modo fade(escondido)
    alert.classList.remove('fade')
    setTimeout(() => {
      alert.classList.add('fade')
      alert.classList.remove(`alert-${type}`)
    }, 3000) // Visível por 3s
  }

  alert.classList.add(`alert-${type}`)
  alert.textContent = message
}

function getList(expense = [], filtred = false) {
  let tableExpenses = document.querySelector('#tableExpenses')
  tableExpenses.innerHTML = '' // Limapando a tabela

  if (expense.length == 0 && filtred === false) {
    expense = db.getAllExpense()
  } 
  else if (expense.length == 0 && filtred == true) {
    messageAlert('danger', 'Nenhuma despesa encontrada!')
  }  

  expense.forEach(el => {
    let row = tableExpenses.insertRow() // Insere linhas <tr> no body da tabela

    // Insere colunas <td> nas linhas
    row.insertCell(0).innerHTML = `${el.day}/${el.month}/${el.year}`
    // Tratativa do campo tipo
    switch (el.type) {
      case '1':
        el.type = 'Alimentação'
        break
      case '2':
        el.type = 'Educação'
        break
      case '3':
        el.type = 'Lazer'
        break
      case '4':
        el.type = 'Saúde'
        break
      case '5':
        el.type = 'Transporte'
        break
    }
    row.insertCell(1).innerHTML = el.type
    row.insertCell(2).innerHTML = el.description
    row.insertCell(3).innerHTML = el.val
  })
}

function searchExpense() {
  let year = document.querySelector('#year') // Acessando os elementos do formulário
  let month = document.querySelector('#month')
  let day = document.querySelector('#day')
  let type = document.querySelector('#type')
  let description = document.querySelector('#description')
  let val = document.querySelector('#val')

  let expense = new Expense(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    val.value
  )

  let filtredExpenses = db.search(expense)

  getList(filtredExpenses, true)
  
}
