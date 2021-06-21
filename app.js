class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
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
constructor(){
    let id = localStorage.getItem('id')
    
    if( id === null) {
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

    recuperarTodosRegistros() {
        
        //Array despesas
        let despesas = Array()
        
        let id = localStorage.getItem('id') //JSON.parse, recupera de String para Objeto literal   
        
        //Recupera todas as despesas cadastrada no locasstorage
        for(let i = 1; i <= id; i++ ) {
            //Recuperar despesa
            let despesa =  JSON.parse(localStorage.getItem(i))

            //Pulando indices que não existem ou que foram removidos 
            if(despesa === null) {
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }
    
    pesquisar(despesa) {
        
        let despesasFiltradas =  Array()

        despesasFiltradas = this.recuperarTodosRegistros()
        
        console.log(despesasFiltradas);
        console.log(despesa)

        
        //ano
        if(despesa.ano != '') {
            console.log("filtro de ano");
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
         }
        //mes
        if(despesa.mes != '') {
            console.log("filtro de mes");
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
         }
        //dia 
        if(despesa.dia != '') {
            console.log("filtro de dia");
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
         }
        //tipo
        if(despesa.tipo != '') {
            console.log("filtro de tipo");
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
         }
        //descrisao
        if(despesa.descricao != '') {
            console.log("filtro de descricao");
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
         }
        //valor
        if(despesa.valor != '') {
            console.log("filtro de valor");
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
         }
         return despesasFiltradas
    }
    remover(id) {
            document.getElementById('modal_titulo').innerHTML = 'Você está prestes a excluir uma despesa!'
     
            document.getElementById('modal_titulo_div').className = 'modal-header bg-warning text-white'
     
            document.getElementById('modal_conteudo').innerHTML = 'Tem certeza que deseja excluir essa despesa?'
     
            document.getElementById('modal_btn').className = 'btn btn-success'
            let btnExcluir = document.getElementById('modal_btn1')
            btnExcluir.className = 'btn btn-danger'
     
            btnExcluir.onclick = function () {
                localStorage.removeItem(id)
                btnExcluir.setAttribute('data-dismiss', 'modal')
                pesquisarDespesa();
                window.location.reload()
            }
            console.log("BTNEXCLUIR ID->", btnExcluir.id)
     
            let btnVoltar = document.getElementById('modal_btn')
            btnVoltar.onclick = function() {
                document.getElementById('modal_btn').innerHTML = 'Voltar'
                window.location.reload()
            }
            
            
            $('#deletarItem').modal('show')
            
            // localStorage.removeItem(id)
            pesquisarDespesa();
        
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

  
    let despesa = new Despesa(
        ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
        )

    
    if(despesa.validarDados()) {
        bd.gravar(despesa)
        //Caixa de sucesso
        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('modal-titulo-div').className = 'modal-header btn-success'
        document.getElementById('modalConteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        //Botão Sucesso
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        document.getElementById('modal-btn').className = 'btn btn-success'

        
       
        //delog de sucesso
        $('#modalRegistraDespesa').modal('show')
        //limpa dados do Forms, após preenchidos.
        ano.value      = ''
		mes.value      = ''
		dia.value      = ''
		tipo.value     = ''
		descricao.value= ''
		valor.value    = ''

       }else {
        //Caixa de Texto erro
        document.getElementById('modalTitulo').innerHTML = 'Erro no registro de dados.'
        document.getElementById('modal-titulo-div').className = 'modal-header btn-danger'
        document.getElementById('modalConteudo').innerHTML = 'Erro na gravação, verefique se todos os campos foram preenchidos corretamente.'
        //Botão Erro
        document.getElementById('modal-btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal-btn').className = 'btn btn-danger'

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }

}

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false ) {
        despesas = bd.recuperarTodosRegistros()
    }

    var total = 0
    var contador = 0 
    
    //Selecionando o Elemento Tbody da Tabela
    let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
    
    //Percorrendo o array despesas
    despesas.forEach(function(d){
        
        //Criando a linha  (tr)
        var linha = listaDespesas.insertRow();

        //Cirando Colunas (Tds)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //Ajustando o tipo para String
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
           
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$${d.valor}`
        
        //Criando Botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times"  ></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
           
        }
        linha.insertCell(4).append(btn)
        console.log(d)
        
        //Somardor de Gastos Totais.
        contador++
        total += parseInt(d.valor)
        console.log(total)

        if( contador == despesas.length) {
            linha = listaDespesas.insertRow();
			linha.insertCell(0).innerHTML = ``
			linha.insertCell(1).innerHTML = ``
			linha.insertCell(2).innerHTML = `<b class="text-white">Total</b>`
			linha.insertCell(3).innerHTML = `<b class="text-white">R$ ${total}</b>`
			linha.insertCell(4).innerHTML = ``

            $('tr').last().css('background', '#007bff',);
        }
    })
}

function pesquisarDespesa() {
    let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)
}



