package com.backlog.backlogfinal.services.interfaces;

import com.backlog.backlogfinal.controller.ResourceNotFoundException;
import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface BoardServiceInterface {

    //Es similar a un array, pero , el tamaño de una lista puede cambiar dinámicamente durante la
    // ejecución del programa.
    public List<BoardImpl> getAllBoardsByIdusuarios(int idusuarios);
    public BoardImpl createBoard(int idusuarios, BoardImpl board) throws ResourceNotFoundException;
    public BoardImpl updateBoard(int idusuarios, int idboards, BoardImpl newBoard) throws ResourceNotFoundException;
    public void deleteBoardByIdAndUsuarioId(int idusuarios, int idboards) throws ResourceNotFoundException;
    BoardImpl getBoardByIdAndUsuarioId(int idusuarios, int idboards) throws ResourceNotFoundException;
}
