package com.example.youxchallenge.dto.report;

import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;

@Getter
@Setter
public class ReportDTO {
    JSONObject cards;

    JSONObject clients;

    JSONObject invoicing;

}
