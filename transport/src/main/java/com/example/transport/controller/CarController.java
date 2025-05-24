package com.example.transport.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CarController {

    @RequestMapping("/")
    public String index() {

        return "index";
    }


}