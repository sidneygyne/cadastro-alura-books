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

