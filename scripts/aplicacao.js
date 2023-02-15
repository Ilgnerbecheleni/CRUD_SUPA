var card = document.getElementById('cards')




async function loadData () {
  let { data: Contatos, error } = await _supabase.from('Contatos').select('*')

  console.table(Contatos)

  if (error) {
    console.log(error)
    return
  } else {
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

loadData()
