package br.edu.sistemaestagios.controller;
import br.edu.sistemaestagios.model.Perfil;
import br.edu.sistemaestagios.model.Usuario;
import br.edu.sistemaestagios.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }

}
