const card = document.getElementById('cards')
const form = document.getElementById('formContato');







async function loadData () {
  let { data: Contatos, error } = await _supabase.from('Contatos').select('*')

  console.table(Contatos)

  if (error) {
    console.log(error)
    return
  } else {
    card.innerHTML='';
    Contatos.map(contato => {
      card.innerHTML += `
        <div class="card m-4" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${contato.Nome}</h5>
            <h5 class="card-text">${contato.Telefone}</h5>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Apagar</button>
        </div>
    </div>`
    })
  }
}

loadData();


form.addEventListener('submit', async (e) => {

    e.preventDefault();

    let nome = form.nome.value;
    let telefone = form.telefone.value;

    let data = {
        Nome: nome, 
        Telefone: telefone
    }

    console.log(data);
 insertData(data);
 form.reset() ; 
 
}); 


async function insertData(dado){

const {data,erro} = await _supabase.from('Contatos').insert([dado]);

if(erro){
    console.log(erro);
    return;
}else{
console.log("dado salvo com sucesso!");
loadData();
}
}

