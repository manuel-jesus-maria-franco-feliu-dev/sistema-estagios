package br.edu.sistemaestagios.model;

import jakarta.persistence.*;

@Entity
public class Estagio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String titulo;

    private String descricao;

    private Integer cargaHoraria;

    private String status;


}

