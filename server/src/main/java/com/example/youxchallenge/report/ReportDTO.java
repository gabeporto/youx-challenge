package com.example.youxchallenge.report;

import com.example.youxchallenge.person.Person;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;

import java.math.BigDecimal;

@Getter
@Setter
public class ReportDTO {
    JSONObject cards;

    JSONObject clients;

    JSONObject invoicing;

}
