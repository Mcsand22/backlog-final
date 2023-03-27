package com.backlog.backlogfinal.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // genera automáticamente los getters, setters, toString, equals
@NoArgsConstructor
@AllArgsConstructor
// Data Transfer Object, es un patrón de diseño, encapsulo datos del usuario que quiero utilizar
// en mi aplicación

public class UsuarioDTO {
    private int idusuarios;
    private String nombre;
    private String apellido;
    private String mail;
    private String contrasenia;
    private String img;



}