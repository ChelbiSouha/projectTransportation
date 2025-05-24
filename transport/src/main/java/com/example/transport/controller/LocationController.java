package com.example.transport.controller;

import com.example.transport.entities.LocationBean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
public class LocationController {

    private final List<LocationBean> all = new CopyOnWriteArrayList<>();

    @MessageMapping("/saveLocation")              // front-end envoie sur /app/saveLocation
    @SendTo("/topic/getData")                     // front-end doit s’abonner à /topic/getData
    public List<LocationBean> save(LocationBean loc) {
        // on garde en mémoire
        all.removeIf(l -> l.getUser().equals(loc.getUser()));
        all.add(loc);
        return all;
    }
}
