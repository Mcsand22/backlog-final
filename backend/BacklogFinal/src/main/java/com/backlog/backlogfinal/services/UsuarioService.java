package com.backlog.backlogfinal.services;

import com.backlog.backlogfinal.controller.ResourceNotFoundException;
import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;
import com.backlog.backlogfinal.mapper.UsuarioMapper;
import com.backlog.backlogfinal.repository.UsuarioRepository;
import com.backlog.backlogfinal.services.interfaces.UsuarioServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements UsuarioServiceInterface {
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        usuario = usuarioRepository.save(usuario);
        return usuarioMapper.toDTO(usuario);
    }

    public List<UsuarioDTO> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        //Stream es una secuencia de elementos de datos que se procesan en tiempo real de manera
        // funcional no almacenan los elementos de datos en una estructura de datos como las
        // colecciones, sino que los procesan sobre la marcha. Aumenta la velocidad de procesamiento
        return usuarios.stream()
                // mapeo el stream y convierto elemento en dto
                .map(usuarioMapper::toDTO)
                // convierto el stream en una lista
                .collect(Collectors.toList());
    }
    public Optional<Usuario> buscarUsuarioPorMailYContrasenia(String mail, String contrasenia) {
        return usuarioRepository.findByMailAndContrasenia(mail, contrasenia);
    }

    public Usuario actualizarUsuario(int idUsuario, Usuario usuarioActualizado) throws ResourceNotFoundException {
        Usuario usuario =
                usuarioRepository.findByIdusuarios(idUsuario).orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado para este id :: " + idUsuario));

        // actualizo los campos del usuario
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuario.setMail(usuarioActualizado.getMail());
        usuario.setContrasenia(usuarioActualizado.getContrasenia());
        usuario.setImg(usuarioActualizado.getImg());

        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByIdusuarios(int idusuarios) {
        return usuarioRepository.findByIdusuarios(idusuarios);
    }

}
