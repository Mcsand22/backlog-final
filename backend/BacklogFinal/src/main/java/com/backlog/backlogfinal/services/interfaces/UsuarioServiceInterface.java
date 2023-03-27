package com.backlog.backlogfinal.services.interfaces;

import com.backlog.backlogfinal.controller.ResourceNotFoundException;
import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioServiceInterface {
    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO);
    public List<UsuarioDTO> obtenerTodosLosUsuarios();
    public Optional<Usuario> buscarUsuarioPorMailYContrasenia(String mail, String contrasenia);
    public Usuario actualizarUsuario(int idUsuario, Usuario usuarioActualizado) throws ResourceNotFoundException;
    Optional<Usuario> findByIdusuarios(int idusuarios);
}
