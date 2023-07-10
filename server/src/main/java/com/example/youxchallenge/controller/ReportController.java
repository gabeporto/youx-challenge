package com.example.youxchallenge.controller;

import com.example.youxchallenge.model.Person;
import com.example.youxchallenge.repository.PersonRepository;
import com.example.youxchallenge.service.ReportService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("report")
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    PersonRepository personRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public String getAllReports(@RequestParam("personId") Long personId) {

        Optional<Person> person = personRepository.findById(personId);

        if(person.isEmpty()) {
            return null;
        }

        JSONObject reportData = reportService.buildReportData(personId);

        return reportData.toString();
    }

}
