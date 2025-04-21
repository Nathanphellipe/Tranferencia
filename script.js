console.log("Hello");

async function buscarVoos() {
    const params = new URLSearchParams({
      origem: 'Mato Grosso',
      destino: 'Espanha',
      saida: '2025-01-01 01:10',
      chegada: '2025-01-01 09:25'
    });
  
    const url = "http://localhost:3000/voos?origem=Mato Grosso&destino=Espanha&saida=2025-01-01 01:10&chegada=2025-01-01 09:25";
  
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
  
      if (!resposta.ok) {
        console.error('Erro:', dados);
      } else {
        console.log('Voos encontrados:', dados);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
    }
  }
  
  buscarVoos();


  