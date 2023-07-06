package com.example.youxchallenge.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DateService {

    public List<LocalDate> getYearRange() {
        LocalDate startDate = LocalDate.now().withDayOfYear(1);
        LocalDate endDate = LocalDate.now().withDayOfYear(365);

        List<LocalDate> localDateList = new ArrayList<>();
        localDateList.add(startDate);
        localDateList.add(endDate);

        return localDateList;
    }

}
