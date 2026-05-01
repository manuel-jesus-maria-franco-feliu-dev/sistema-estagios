package br.edu.sistemaestagios.repository;

import br.edu.sistemaestagios.model.Estagio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstagioRepository extends JpaRepository<Estagio, Long> {
}