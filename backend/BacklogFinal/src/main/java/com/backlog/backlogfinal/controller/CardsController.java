package com.backlog.backlogfinal.controller;


import com.backlog.backlogfinal.entity.CardsImpl;
import com.backlog.backlogfinal.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:4200")
public class CardsController {

    @Autowired
    private CardService cardService;

    @GetMapping("/{idboards}")
    public List<CardsImpl> getCardsByBoardId(@PathVariable int idboards) {
        return cardService.getCardsByBoardId(idboards);
    }

    @GetMapping("/{idboards}/card/{idcards}")
    public CardsImpl getCardById(@PathVariable int idboards, @PathVariable int idcards) {
        return cardService.getCardById(idboards, idcards);
    }


    @PostMapping("/board/{idboards}/create")
    public CardsImpl createCard(@PathVariable int idboards, @RequestBody CardsImpl newCard) {
        return cardService.createCard(idboards, newCard);
    }

    @PutMapping("board/{idboards}/card/{idcards}/edit")
    public CardsImpl updateCard(@PathVariable int idboards, @PathVariable int idcards, @RequestBody CardsImpl updatedCard) {
        return cardService.updateCard(idboards, idcards, updatedCard);
    }

    @DeleteMapping("/board/{idboards}/card/{idcards}/delete")
    public void deleteCard(@PathVariable int idboards, @PathVariable int idcards) {
        cardService.deleteCard(idboards, idcards);
    }
}