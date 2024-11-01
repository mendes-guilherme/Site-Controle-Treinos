import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Treinos = () => {
  const [treinos, setTreinos] = useState([]);
  const [novoTreino, setNovoTreino] = useState({ nome: '', descricao: '', dataTreino: '' });
  const [exercicios, setExercicios] = useState([]);
  const [novoExercicio, setNovoExercicio] = useState({ nome: '', peso: '', series: '', repeticoes: '' });
  const [todosExercicios, setTodosExercicios] = useState([]);
  const [exerciciosFiltrados, setExerciciosFiltrados] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null); // Novo estado para o treino selecionado


  useEffect(() => {
    axios.get('/api/treinos')
      .then(response => setTreinos(response.data))
      .catch(error => console.error("Erro ao carregar os treinos:", error));
  }, []);

  useEffect(() => {
    axios.get('/api/treinos/exercicios')
      .then(response => setTodosExercicios(response.data))
      .catch(error => console.error("Erro ao carregar todos os exercícios:", error));
  }, []);

  const filtrarExerciciosPorTreino = (treinoId, treinoNome) => {
    axios.get(`/api/treinos/${treinoId}/exercicios`)
      .then(response => {
        setExerciciosFiltrados(response.data);
        setTreinoSelecionado(treinoNome); // Define o nome do treino selecionado
      })
      .catch(error => console.error("Erro ao carregar exercícios do treino:", error));
  };
  
    const adicionarTreino = () => {
    axios.post('/api/treinos', novoTreino)
      .then(response => {
        const treinoId = response.data.id;
        setTreinos([...treinos, response.data]);
        setNovoTreino({ nome: '', descricao: '', dataTreino: '' });

        exercicios.forEach(exercicio => {
          axios.post(`/api/treinos/${treinoId}/exercicios`, { ...exercicio, treinoId })
            .catch(error => console.error("Erro ao adicionar exercício:", error));
        });

        setExercicios([]);
      })
      .catch(error => console.error("Erro ao adicionar treino:", error));
  };

  const adicionarExercicio = () => {
    setExercicios([...exercicios, novoExercicio]);
    setNovoExercicio({ nome: '', peso: '', series: '', repeticoes: '' });
  };

  const deletarTreino = (id, event) => {
    event.stopPropagation();
    axios.delete(`/api/treinos/${id}`)
      .then(() => setTreinos(treinos.filter(treino => treino.id !== id)))
      .catch(error => console.error("Erro ao deletar treino:", error));
  };

  return (
    <div className="container">
      <h1>Gerenciador de treinos</h1>
      
      <div className="section">
        <h2>Adicionar Novo Treino</h2>
        <input type="text" placeholder="Nome" value={novoTreino.nome} onChange={e => setNovoTreino({ ...novoTreino, nome: e.target.value })} />
        <input type="text" placeholder="Descrição" value={novoTreino.descricao} onChange={e => setNovoTreino({ ...novoTreino, descricao: e.target.value })} />
        <input type="date" value={novoTreino.dataTreino} onChange={e => setNovoTreino({ ...novoTreino, dataTreino: e.target.value })} />

        <h3>Adicionar Exercício</h3>
        <input type="text" placeholder="Nome do Exercício" value={novoExercicio.nome} onChange={e => setNovoExercicio({ ...novoExercicio, nome: e.target.value })} />
        <input type="number" placeholder="Peso (kg)" value={novoExercicio.peso} onChange={e => setNovoExercicio({ ...novoExercicio, peso: e.target.value })} />
        <input type="number" placeholder="Séries" value={novoExercicio.series} onChange={e => setNovoExercicio({ ...novoExercicio, series: e.target.value })} />
        <input type="number" placeholder="Repetições" value={novoExercicio.repeticoes} onChange={e => setNovoExercicio({ ...novoExercicio, repeticoes: e.target.value })} />
        <button onClick={adicionarExercicio} className="btn">Adicionar Exercício</button>

        <h4>Exercícios Adicionados:</h4>
        <ul className="exercise-list">
          {exercicios.map((exercicio, index) => (
            <li key={index}>{exercicio.nome} - {exercicio.peso}kg, {exercicio.series} séries, {exercicio.repeticoes} repetições</li>
          ))}
        </ul>

        <button onClick={adicionarTreino} className="btn">Adicionar Treino</button>
      </div>

      <div className="section">
        <h4>Todos os Treinos</h4>
        <ul className="training-list">
          {treinos.map(treino => (
            <li key={treino.id} onClick={() => filtrarExerciciosPorTreino(treino.id,treino.nome)}>
              <span>{treino.nome} - {treino.descricao}</span>
              <button onClick={(event) => deletarTreino(treino.id, event)} className="btn-delete">Deletar</button>
            </li>
          ))}
        </ul>
      </div>
      
      {treinoSelecionado && (
      <div className="section">
        <h4>Exercícios do Treino Selecionado: {treinoSelecionado}</h4>
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
      )}
    </div>
  );
};

export default Treinos;
