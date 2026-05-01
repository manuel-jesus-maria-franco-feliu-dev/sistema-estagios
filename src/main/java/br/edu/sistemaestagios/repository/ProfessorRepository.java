package br.edu.sistemaestagios.repository;

import br.edu.sistemaestagios.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
