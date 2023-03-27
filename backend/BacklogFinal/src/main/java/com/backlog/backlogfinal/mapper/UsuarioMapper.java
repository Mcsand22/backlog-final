package com.backlog.backlogfinal.mapper;

import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
//el Mapper se utiliza para convertir objetos de la clase Usuario en objetos de la clase UsuarioDTO y viceversa.
@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    @Mapping(target= "contrasenia", ignore = true)
    UsuarioDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioDTO usuarioDTO);
}