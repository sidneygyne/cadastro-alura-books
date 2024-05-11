// forma de buscar o cep com codigo mais extenso
// var consultaCEP = fetch('https://viacep.com.br/ws/74370080/json/')
//     .then(resposta => resposta.json())
//     .then(r =>  {
//         if (r.erro) {
//             throw Error('Esse cep não existe!')
//         } else
//             console.log(r)
//     })
//     .catch(erro => console.log(erro))
//     .finally(mensgem => console.log('Processamento concluido!'));
//     console.log(consultaCEP);
//     console.log('atençao', consulta.thenCEP)

async function buscaEndereco (cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = " ";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
            
        }

        // variaveis dos campos a completar
        var estado = document.getElementById('estado');
        var cidade = document.getElementById('cidade');
        var bairro = document.getElementById('bairro');
        var logradouro = document.getElementById('endereco');

        // auto completa campos
        estado.value = consultaCEPConvertida.uf;
        cidade.value = consultaCEPConvertida.localidade;
        bairro.value = consultaCEPConvertida.bairro;
        logradouro.value = consultaCEPConvertida.logradouro;
       

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML= `<br/><p>CEP inválido. Tente Novamente</p>`
        console.log(erro)
    }
        
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value)); // focusout = quando digitar algo no campo cep, ao sair do campo, seja com tab ou clicando fora apos inserir dados, ai o evento e chamado.



// para fazer varias chamadas de cep
// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
// buscaEndereco()


// A função "buscaEndereco" é uma função assíncrona que recebe um parâmetro cep.
// Dentro da função, primeiro é selecionado um elemento HTML com o ID "erro" e seu conteúdo é limpo.
// Em seguida, é feita uma requisição fetch para a API ViaCEP, passando o CEP informado como parâmetro na URL.
// O resultado da requisição é convertido para JSON e armazenado na variável "consultaCEPConvertida".
// É feita uma verificação se o objeto "consultaCEPConvertida" possui a propriedade "erro". Caso seja verdadeiro, um erro é lançado com a mensagem "CEP não existente!".
// Caso não haja erro, os campos de estado, cidade, bairro e logradouro são preenchidos automaticamente com os valores retornados pela API.
// A função retorna o objeto "consultaCEPConvertida".
// Caso ocorra algum erro durante a execução da função, a mensagem de erro é exibida no elemento com o ID "erro".
// Fora da função, é selecionado o elemento com o ID "cep" e é adicionado um evento de "focusout" (quando o usuário sai do campo) que chama a função "buscaEndereco" passando o valor do campo "cep" como parâmetro.

// Algumas observações sobre esse código:
// Ele utiliza a API ViaCEP para buscar informações de endereço a partir de um CEP informado pelo usuário.
// Há um tratamento de erros, onde caso o CEP informado não seja válido, uma mensagem de erro é exibida.
// Os campos de estado, cidade, bairro e logradouro são preenchidos automaticamente após a busca do CEP.
// O evento de "focusout" é utilizado para disparar a busca do CEP assim que o usuário sair do campo.
// Espero que essa análise tenha sido útil! Caso tenha alguma outra dúvida, fique à vontade para perguntar.
