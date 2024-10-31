package com.exemplo.treinos.mapper;

import org.apache.ibatis.annotations.*;

import com.exemplo.treinos.model.Treino;
import java.time.LocalDate;


@Mapper
public interface TreinoMapper {
    @Select("SELECT * FROM treinos WHERE id = #{id}")
    @Results({
            @Result(property = "dataTreino", column = "data_treino", javaType = LocalDate.class)
    })
    Treino findTreinoById(Long id);


    @Insert("INSERT INTO treinos (id, nome, descricao, data_treino) VALUES (#{id}, #{nome}, #{descricao}, #{dataTreino})")
    @SelectKey(statement = "SELECT treinos_seq.NEXTVAL FROM dual", keyProperty = "id", before = true, resultType = Long.class)
    void insertTreino(Treino treino);

    @Update("UPDATE treinos SET nome = #{nome}, descricao = #{descricao}, data_treino = #{dataTreino} WHERE id = #{id}")
    void updateTreino(Treino treino);

    @Delete("DELETE FROM treinos WHERE id = #{id}")
    void deleteTreino(Long id);
}
