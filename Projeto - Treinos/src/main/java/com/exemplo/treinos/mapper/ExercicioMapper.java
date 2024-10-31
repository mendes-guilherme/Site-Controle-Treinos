package com.exemplo.treinos.mapper;

import com.exemplo.treinos.model.Exercicio;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ExercicioMapper {

    @Select("SELECT * FROM exercicios WHERE treino_id = #{treinoId}")
    List<Exercicio> findExerciciosByTreinoId(Long treinoId);

    @Insert("INSERT INTO exercicios (nome, peso, series, repeticoes, treino_id) " +
            "VALUES (#{nome}, #{peso}, #{series}, #{repeticoes}, #{treinoId})")
    void insertExercicio(Exercicio exercicio);

    @Update("UPDATE exercicios SET nome = #{nome}, peso = #{peso}, series = #{series}, repeticoes = #{repeticoes} " +
            "WHERE id = #{id}")
    void updateExercicio(Exercicio exercicio);

    @Delete("DELETE FROM exercicios WHERE id = #{id}")
    void deleteExercicio(Long id);
}