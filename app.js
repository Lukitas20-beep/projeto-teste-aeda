class Despesa {
	constructor(nome, cpf, genero, idade, celular, endereco, foto) {
		this.nome = nome
		this.cpf = cpf
		this.genero = genero
		this.idade = idade
		this.celular = celular
		this.endereco = endereco
        this.foto = foto
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

}

let bd = new Bd()

function cadastrarDespesa() {

	let nome = document.getElementById('nome')
	let cpf = document.getElementById('cpf')
	let genero = document.getElementById('genero')
	let idade = document.getElementById('idade')
	let celular = document.getElementById('celular')
	let endereco = document.getElementById('endereco')
    let foto = document.getElementById("foto")

	let despesa = new Despesa(
		nome.value, 
		cpf.value, 
		genero.value, 
		idade.value, 
		celular.value,
		endereco.value,
        foto.value
	)


	if(despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		nome.value = '' 
		cpf.value = ''
		genero.value = ''
		idade.value = ''
		celular.value = ''
		endereco.value = ''
        foto.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}
}

