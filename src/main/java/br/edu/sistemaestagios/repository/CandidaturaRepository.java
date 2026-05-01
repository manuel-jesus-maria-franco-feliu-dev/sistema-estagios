package br.edu.sistemaestagios.repository;

import br.edu.sistemaestagios.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {
}