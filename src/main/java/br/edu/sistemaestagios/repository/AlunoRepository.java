package br.edu.sistemaestagios.repository;
import br.edu.sistemaestagios.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}

