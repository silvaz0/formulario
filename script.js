const form = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoIdade = document.getElementById("idade");
const campoMensagemTexto = document.getElementById("mensagem-texto");
const contador = document.getElementById("contador");
const divMensagem = document.getElementById("mensagem");


campoMensagemTexto.addEventListener("input", function () {
    const quantidade = campoMensagemTexto.value.length;
    contador.textContent = quantidade + " / 100 caracteres";
});

const camposDeTexto = [campoNome, campoEmail, campoIdade];

for (let i = 0; i < camposDeTexto.length; i++) {
    const campo = camposDeTexto[i];

    campo.addEventListener("focus", function () {
        campo.classList.add("focado");
    });

    campo.addEventListener("blur", function () {
        campo.classList.remove("focado");
    });
}

const checkboxesInteresse = document.querySelectorAll('input[name="interesse"]');

checkboxesInteresse.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            console.log("Marcou o interesse:", checkbox.value);
        } else {
            console.log("Desmarcou o interesse:", checkbox.value);
        }
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede o recarregamento da página

    // Limpa marcações de erro de uma tentativa anterior
    campoNome.classList.remove("erro");
    campoEmail.classList.remove("erro");
    campoIdade.classList.remove("erro");

    const nome = campoNome.value.trim(); // trim() remove espaços nas pontas
    const email = campoEmail.value.trim();
    const idade = Number(campoIdade.value);

    let valido = true;
    let erros = [];

    // --- Validações ---
    if (nome === "") {
        valido = false;
        erros.push("O nome é obrigatório.");
        campoNome.classList.add("erro");
    }

    if (!email.includes("@")) {
        valido = false;
        erros.push("Digite um e-mail válido.");
        campoEmail.classList.add("erro");
    }

    if (idade <= 0 || idade > 120) {
        valido = false;
        erros.push("Digite uma idade válida.");
        campoIdade.classList.add("erro");
    }

    // --- Exibindo o resultado ---
    if (valido) {
        divMensagem.className = "sucesso";
        divMensagem.textContent = "Cadastro de " + nome + " realizado com sucesso!";
        form.reset(); // limpa todos os campos do formulário
        contador.textContent = "0 / 100 caracteres";
    } else {
        divMensagem.className = "falha";
        divMensagem.textContent = erros.join(" ");
    }
});
