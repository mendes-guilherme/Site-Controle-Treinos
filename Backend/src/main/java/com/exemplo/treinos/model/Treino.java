package com.exemplo.treinos.model;

import java.time.LocalDate;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;


@Data
public class Treino {
    private Long id;
    private String nome;
    private String descricao;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataTreino;
    
}