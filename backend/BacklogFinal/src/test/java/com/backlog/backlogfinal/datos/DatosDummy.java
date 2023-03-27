package com.backlog.backlogfinal.datos;

import com.backlog.backlogfinal.dto.UsuarioDTO;
import com.backlog.backlogfinal.entity.Usuario;

public class DatosDummy {

    public static Usuario getUsuarioAdmin() {

        return new Usuario(1, "Administrador", "Administrador", "admin@gmail.com", "123456789",
                "http://img");
    }

    public static UsuarioDTO getUsuarioAdminDto() {

        return new UsuarioDTO(1, "Administrador", "Administrador", "admin@gmail.com", "123456789",
                "http://img");
    }


    public static Usuario getUsuarioPrueba(){
        return new Usuario(2, "Prueba", "Prueba", "prueba@gmail.com", "prueba",
                "http://img");
    }

    public static Usuario setUsuarioAdmin(){
        return new Usuario(1, "Administrador", "Administrador", "admin@gmail.com", "123456789",
                "http://img");
    }

    public static Usuario setUsuarioPrueba(){
        return new Usuario(2, "Prueba", "Prueba", "prueba@gmail.com", "prueba",
                "http://img");
    }
}
