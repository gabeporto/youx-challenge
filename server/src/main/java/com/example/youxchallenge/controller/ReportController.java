package com.example.youxchallenge.controller;

import com.example.youxchallenge.service.ReportService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("report")
public class ReportController {

    @Autowired
    ReportService reportService;


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public String getAllReports() {

        JSONObject reportData = reportService.buildReportData();

        return reportData.toString();
    }

}
