package com.backlog.backlogfinal.entity;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;


@Entity
@Table(name= "usuarios")
@Data // genera automáticamente los getters, setters, toString, equals y hashCode
@NoArgsConstructor // genera un constructor vacío
@AllArgsConstructor // genera un constructor con todos los campos
public class Usuario {
    @Id
    @Column(name = "idusuarios", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idusuarios;
    @NotNull
    private String nombre;
    @NotNull
    private String apellido;

    @NotNull
    @Column(unique = true)
    private String mail;

    @NotNull
    private String contrasenia;

    private String img;
}