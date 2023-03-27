package com.backlog.backlogfinal.controller;

import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200") //permito el acceso a este controlador desde otro
// dominio
@RestController //controlador REST
@RequestMapping("/boards") // para definir la URL base para todas las solicitudes que se manejan
// en este controlador
public class BoardController {
    @Autowired // inyecto boardservice
    private BoardService boardService;

    @GetMapping("/{idusuarios}")
    public List<BoardImpl> getAllBoardsByIdusuarios(@PathVariable int idusuarios)/*  el valor de
    // "idusuarios" viene de la ruta*/ {
        return boardService.getAllBoardsByIdusuarios(idusuarios);
    }

    @PostMapping("/{idusuarios}/boards")
    public BoardImpl createBoard(@PathVariable int idusuarios, @RequestBody BoardImpl board) throws ResourceNotFoundException {
        return boardService.createBoard(idusuarios, board);
    }

    @PutMapping("/{idusuarios}/board/{idboards}/update")
    public BoardImpl updateBoard(@PathVariable int idusuarios, @PathVariable int idboards,
     /*@RequestBody una anotación que ayuda a mapear los datos enviados por el cliente en una
     solicitud HTTP a objetos Java utilizables dentro de una aplicación web de Spring
     .*/                        @RequestBody BoardImpl newBoard) throws ResourceNotFoundException {

        return boardService.updateBoard(idusuarios, idboards, newBoard);
    }

    @DeleteMapping("/{idusuarios}/board/{idboards}")
    @Transactional
    public void deleteBoardByIdAndUsuarioId(@PathVariable int idusuarios,
                                            @PathVariable int idboards) throws ResourceNotFoundException {
        boardService.deleteBoardByIdAndUsuarioId(idusuarios, idboards);
    }

    @GetMapping("/{idusuarios}/board/{idboards}")
    public BoardImpl getBoardByIdAndUsuarioId(@PathVariable int idusuarios, @PathVariable int idboards) throws ResourceNotFoundException {
        return boardService.getBoardByIdAndUsuarioId(idusuarios, idboards);
    }
}
