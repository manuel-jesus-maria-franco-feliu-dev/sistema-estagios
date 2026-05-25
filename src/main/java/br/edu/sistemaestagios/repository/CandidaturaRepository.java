package br.edu.sistemaestagios.repository;

import br.edu.sistemaestagios.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {

    List<Candidatura> findByAlunoId(Long alunoId);

    List<Candidatura> findByEstagioId(Long estagioId);

    List<Candidatura> findByStatus(String status);
}
