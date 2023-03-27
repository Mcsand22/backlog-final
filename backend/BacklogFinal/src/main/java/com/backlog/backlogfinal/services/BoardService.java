package com.backlog.backlogfinal.services;

import com.backlog.backlogfinal.controller.ResourceNotFoundException;
import com.backlog.backlogfinal.entity.BoardImpl;
import com.backlog.backlogfinal.entity.Usuario;
import com.backlog.backlogfinal.repository.BoardRepository;
import com.backlog.backlogfinal.repository.UsuarioRepository;
import com.backlog.backlogfinal.services.interfaces.BoardServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;

@Service
public class BoardService implements BoardServiceInterface {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<BoardImpl> getAllBoardsByIdusuarios(int idusuarios) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByIdusuarios(idusuarios);
        return usuario.map(u -> boardRepository.findAllByUsuarioHql(u))
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró usuario con id " + idusuarios));
    }


    public BoardImpl createBoard(int idusuarios, BoardImpl board) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByIdusuarios(idusuarios);
        if (usuario.isPresent()) {
            board.setUsuario(usuario.get());
            return boardRepository.save(board);
        } else {
            throw new ResourceNotFoundException("No se encontró usuario con id " + idusuarios);
        }
    }

    public BoardImpl updateBoard(int idusuarios, int idboards, BoardImpl newBoard) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByIdusuarios(idusuarios);
        Optional<BoardImpl> boardOptional = boardRepository.findById(idboards);
        if (usuario.isPresent() && boardOptional.isPresent()) {
            BoardImpl board = boardOptional.get();
            board.setTituloboard(newBoard.getTituloboard());
            board.setImg(newBoard.getImg());
            boardRepository.save(board);
            return board;
        } else {
            throw new ResourceNotFoundException("No se encontró el board con " +
                    "id " + idboards + " del usuario con id " + idusuarios);
        }
    }

    public void deleteBoardByIdAndUsuarioId(int idusuarios, int idboards) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByIdusuarios(idusuarios);
        if (usuario.isPresent()) {
            Optional<BoardImpl> board = boardRepository.findByIdboardsAndUsuario(idboards,
                    usuario.get());
            if (board.isPresent()) {
                boardRepository.deleteByIdboards(idboards);
            } else {
                throw new ResourceNotFoundException("Board no encontrado");
            }
        } else {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
    }

    public BoardImpl getBoardByIdAndUsuarioId(int idusuarios, int idboards) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByIdusuarios(idusuarios);
        if (usuario.isPresent()) {
            Optional<BoardImpl> board = boardRepository.findByIdboardsAndUsuario(idboards, usuario.get());
            if (board.isPresent()) {
                return board.get();
            } else {
                throw new ResourceNotFoundException("Board no encontrado");
            }
        } else {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
    }
}
