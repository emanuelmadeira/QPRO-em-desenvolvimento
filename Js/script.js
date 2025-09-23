const form = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const senha = document.getElementById("senha");
const datanasc = document.getElementById("datanasc");

function validarMaioridade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    // Verifica se a data é válida
    if (isNaN(nascimento.getTime())) {
        return false;
    }
    
    // Verifica se a data não é futura
    if (nascimento > hoje) {
        return false;
    }
  
    
    // Calcula a idade
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    // Ajusta se ainda não fez aniversário este ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    if(idade > 120){
        return false
    }
    return idade >= 18;
}

// Função para validar a senha
function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
    return regex.test(senha);
}

form.addEventListener("submit", e => {
    e.preventDefault(); // impede o envio automático do formulário

    // validação do nome
    if (nome.value.trim().length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        nome.focus();
        return;
    }

    // validação do e-mail
    if (!email.value.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    // limpa o telefone apenas com números
    telefone.value = telefone.value.replace(/\D/g, "");
    if (telefone.value.length < 10) {
        alert("Digite um telefone válido com DDD.");

        return;
    }

    // validação da senha
    if (!validarSenha(senha.value)) {
        alert("Senha deve ter:\n• Mínimo 8 caracteres\n• Pelo menos 1 letra\n• Pelo menos 1 número\n• Pelo menos 1 caractere especial (@$!%*#?&.)");
        senha.focus();
        return;
    }

    if (!datanasc.value) {
        alert("Por favor, informe a data de nascimento.");
        datanasc.focus();
        return;
    }
   
    if (!validarMaioridade(datanasc.value)) {
        alert("Você deve ter mais de 18 anos e menor que 120 anos para se cadastrar.");
        datanasc.focus();
        return;
    }

    
    console.log("Nome:", nome.value);
    console.log("Email:", email.value);
    console.log("Telefone:", telefone.value);
    console.log("Senha:", senha.value);
    console.log("Data de Nascimento:", datanasc.value);

    alert("Formulário enviado com sucesso!");
    form.reset(); 
});

// Máscara de telefone
telefone.addEventListener("input", e => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.length <= 10 ? valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3") : valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    e.target.value = valor;
});