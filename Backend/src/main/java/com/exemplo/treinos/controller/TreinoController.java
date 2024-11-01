package com.exemplo.treinos.controller;


import com.exemplo.treinos.mapper.ExercicioMapper;
import com.exemplo.treinos.mapper.TreinoMapper;
import com.exemplo.treinos.model.Exercicio;
import com.exemplo.treinos.model.Treino;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/treinos")
public class TreinoController {

    @Autowired
    private TreinoMapper treinoMapper;

    @GetMapping("/{id}")
    public Treino getTreinoById(@PathVariable Long id) {
        return treinoMapper.findTreinoById(id);
    }

    @GetMapping("")
    public List<Treino> getAllTreinos() {
        return treinoMapper.findAllTreinos();
    }

    @PostMapping
    public ResponseEntity<Treino> addTreino(@RequestBody Treino treino) {
        treinoMapper.insertTreino(treino); 
        return ResponseEntity.ok(treino);
    }

    @PutMapping("/{id}")
    public void updateTreino(@PathVariable Long id, @RequestBody Treino treino) {
        treino.setId(id);
        treinoMapper.updateTreino(treino);
    }

    @DeleteMapping("/{id}")
    public void deleteTreino(@PathVariable Long id) {
        treinoMapper.deleteTreino(id);
    }

    @Autowired
    private ExercicioMapper exercicioMapper;

    @GetMapping("/{treinoId}/exercicios")
    public List<Exercicio> getExerciciosByTreino(@PathVariable Long treinoId) {
        return exercicioMapper.findExerciciosByTreinoId(treinoId);
    }

    @GetMapping("/exercicios")
    public List<Exercicio> getAllExercicios() {
        return exercicioMapper.findAllExercicios();
    }

    @PostMapping("/{treinoId}/exercicios")
    public void addExercicio(@PathVariable Long treinoId, @RequestBody Exercicio exercicio) {
        exercicio.setTreinoId(treinoId);
        exercicioMapper.insertExercicio(exercicio);
    }
    
    @DeleteMapping("/exercicios/{id}")
    public void deleteExercicio(@PathVariable Long id) {
        exercicioMapper.deleteExercicio(id);
    }

}

