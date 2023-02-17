const card = document.getElementById('cards')
const form = document.getElementById('formContato');
let condicao = true;


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
            <button class="btn btn-primary" onClick='prepareData(${contato.id})'>Editar</button>
            <button class="btn btn-danger" onClick='deletar(${contato.id})'>Apagar</button>
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
    if(condicao){
        insertData(data);
    }else{

        let id = parseInt(form.inputid.value);
        updateData(id,data);
        


    }
   
    

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


async function deletar(id){

    if(confirm("Deseja realmente apagar esse dado?")){
        const { data, error } = await _supabase
        .from('Contatos')
        .delete()
        .eq('id', id);
    if(error){
        console.log(error);
        return
    }
    loadData();
    }

    return

}


async function prepareData(id){

    let { data: Contatos, error } = await _supabase
  .from('Contatos')
  .select('*').eq('id', id)
  

  if (error) {
    console.log(error)
    return
  } else {

form.inputid.value = Contatos[0]["id"];
form.nome.value = Contatos[0]["Nome"];
form.telefone.value = Contatos[0]["Telefone"];
condicao = false ;

  }



}

async function updateData(id,dado){

    const { data, error } = await _supabase
    .from('Contatos')
    .update(dado)
    .eq('id',id);

    if(error){
        console.log(error);
        return
    }
    condicao=true;
    loadData();

}
