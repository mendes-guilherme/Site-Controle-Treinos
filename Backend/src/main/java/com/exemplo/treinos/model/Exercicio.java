package com.exemplo.treinos.model;

import lombok.Data;

@Data
public class Exercicio {
    private Long id;
    private String nome;
    private int peso;
    private int series;
    private int repeticoes;
    private Long treinoId;
}
