import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Treinos = () => {
  const [treinos, setTreinos] = useState([]);
  const [novoTreino, setNovoTreino] = useState({
    nome: '',
    descricao: '',
    dataTreino: '',
  });
  const [exercicios, setExercicios] = useState([]); 
  const [novoExercicio, setNovoExercicio] = useState({ nome: '', peso: '', series: '', repeticoes: '', treinoId: '' });
  const [todosExercicios, setTodosExercicios] = useState([]);
  const [exerciciosFiltrados, setExerciciosFiltrados] = useState([]);

  useEffect(() => {
    axios.get('/api/treinos')
    .then(response => {
      setTreinos(response.data);
      console.log(treinos)
    })
      .catch(error => console.error("Erro ao carregar os treinos:", error));
  }, []);

  useEffect(() => {
    axios.get('/api/treinos/exercicios')
      .then(response => setTodosExercicios(response.data))
      .catch(error => console.error("Erro ao carregar todos os exercícios:", error));
  }, []);

  const filtrarExerciciosPorTreino = (treinoId) => {
    const exerciciosDoTreino = todosExercicios.filter(exercicio => exercicio.treinoId === treinoId);
    setExerciciosFiltrados(exerciciosDoTreino);
  };

  const adicionarTreino = () => {
    // Add treino
    axios.post('/api/treinos', novoTreino)
      .then(response => {
        const treinoId = response.data.id; // recebe Id do treino criado
        setTreinos([...treinos, response.data]);
        setNovoTreino({ nome: '', descricao: '', dataTreino: '' });

        // Add exerc associado ao treino
        exercicios.forEach(exercicio => {
          axios.post(`/api/treinos/${treinoId}/exercicios`, { ...exercicio, treinoId })
            .catch(error => console.error("Erro ao adicionar exercício:", error));
        });

        setExercicios([]);
      })
      .catch(error => console.error("Erro ao adicionar treino:", error));
  };

  const deletarTreino = (id) => {
    axios.delete(`/api/treinos/${id}`)
      .then(() => setTreinos(treinos.filter(treino => treino.id !== id)))
      .catch(error => console.error("Erro ao deletar treino:", error));
  };

  const adicionarExercicio = () => {
    setExercicios([...exercicios, novoExercicio]);
    setNovoExercicio({ nome: '', peso: '', series: '', repeticoes: '' });
  };

  return (
    <div>

      <h2>Adicionar Novo Treino</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novoTreino.nome}
        onChange={e => setNovoTreino({ ...novoTreino, nome: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={novoTreino.descricao}
        onChange={e => setNovoTreino({ ...novoTreino, descricao: e.target.value })}
      />
      <input
        type="date"
        placeholder="Data do Treino"
        value={novoTreino.dataTreino}
        onChange={e => setNovoTreino({ ...novoTreino, dataTreino: e.target.value })}
      />

      <h3>Adicionar Exercício</h3>
      <input
        type="text"
        placeholder="Nome do Exercício"
        value={novoExercicio.nome}
        onChange={e => setNovoExercicio({ ...novoExercicio, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Peso (kg)"
        value={novoExercicio.peso}
        onChange={e => setNovoExercicio({ ...novoExercicio, peso: e.target.value })}
      />
      <input
        type="number"
        placeholder="Séries"
        value={novoExercicio.series}
        onChange={e => setNovoExercicio({ ...novoExercicio, series: e.target.value })}
      />
      <input
        type="number"
        placeholder="Repetições"
        value={novoExercicio.repeticoes}
        onChange={e => setNovoExercicio({ ...novoExercicio, repeticoes: e.target.value })}
      />

      <button onClick={adicionarExercicio}>Adicionar Exercício</button>

      <h4>Exercícios Adicionados:</h4>
      <ul>
        {exercicios.map((exercicio, index) => (
          <li key={index}>
            {exercicio.nome} - Peso: {exercicio.peso}kg, Séries: {exercicio.series}, Repetições: {exercicio.repeticoes}
          </li>
        ))}
      </ul>

      <button onClick={adicionarTreino}>Adicionar Treino</button>


      <h2>Todos os Treinos</h2>
      <ul>
        {treinos.map(treino => (
          <li
            key={treino.id}
            onClick={() => filtrarExerciciosPorTreino(treino.id)}
            style={{ cursor: 'pointer', marginBottom: '10px', listStyle: 'none', padding: '5px', border: '1px solid #ccc' }}
          >
            <span>
              {treino.nome} - {treino.descricao} - {treino.dataTreino}
            </span>
            <button onClick={(event) => deletarTreino(treino.id, event)} style={{ marginLeft: '10px' }}>Deletar</button>
          </li>
        ))}
      </ul>

      <h3>Exercícios do Treino Selecionado</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Peso</th>
            <th>Séries</th>
            <th>Repetições</th>
          </tr>
        </thead>
        <tbody>
          {exerciciosFiltrados.map(exercicio => (
            <tr key={exercicio.id}>
              <td>{exercicio.nome}</td>
              <td>{exercicio.peso} kg</td>
              <td>{exercicio.series}</td>
              <td>{exercicio.repeticoes}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};


export default Treinos;