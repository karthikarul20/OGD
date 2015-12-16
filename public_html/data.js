/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    google.setOnLoadCallback(initializeCharts);
});


initializeCharts.load = [];
initializeCharts.allData = {
    "H-DS-1": {
        key: "H-DS-1",
        xTitle: "Year",
        yTitle: "Count",
        link: "http://data.gov.in/catalog/number-cases-and-deaths-due-diseases",
        json: "https://data.gov.in/node/89494/datastore/export/json",
        title: "Number of Cases And Deaths Due To Diseases",
        desc: "AllIndia (from 2000 to 2011) and State-wise (2010 and 2011) number of cases and deaths due to specified diseases (Acute Diarrhoeal Diseases, Malaria, Acute Respiaratory Infection, Japanese Encephalitis, Viral Hepatitis)."
    },
    "H-DS-2": {
        key: "H-DS-2",
        xTitle: "Year",
        yTitle: "Count",
        link: "http://data.gov.in/catalog/cases-and-deaths-due-kala-azar",
        json: "https://data.gov.in/node/86617/datastore/export/json",
        title: "Cases and Deaths due to Kala-Azar",
        desc: "Cases and Deaths due to the illness Kala-Azar in Bihar, West Bengal and Country during the years 1996 till 2000."
    },
    "H-DS-3": {
        key: "H-DS-3",
        xTitle: "Year",
        yTitle: "Count",
        link: "https://data.gov.in/catalog/cases-and-deaths-due-japanese-encephalitis-and-dengue-dhf-during-tenth-plan",
        json: "https://data.gov.in/node/86615/datastore/export/json",
        title: "Cases and Deaths due to Japanese Encephalitis and Dengue / DHF during Tenth Plan",
        desc: "Cases and Deaths due to Japanese Encephalitis and Dengue / DHF during Tenth Plan."
    },
    "F-DS-1": {
        key: "F-DS-1",
        xTitle: "Year",
        yTitle: "Count",
        link: "https://data.gov.in/catalog/outlays-and-expenditure-aids-control-programme-during-ninth-plan",
        json: "https://data.gov.in/node/89689/datastore/export/json",
        title: "Outlays and Expenditure of AIDS Control Programme during Ninth Plan",
        desc: "Outlays and Expenditure of AIDS Control Programme during Ninth Plan"
    },
    "F-DS-2": {
        key: "F-DS-2",
        xTitle: "Year",
        yTitle: "Count",
        link: "https://data.gov.in/catalog/public-sector-outlaysexpenditure-during-eleventh-five-year-plan",
        json: "https://data.gov.in/node/90552/datastore/export/json",
        title: "Public Sector Outlays/Expenditure during Eleventh Five Year Plan",
        desc: "public sector outlays and expenditures during Eleventh Five Year Plan (2007-12) under various Heads of Development (Rs. Crore)."
    },
    "F-DS-3": {
        key: "F-DS-3",
        xTitle: "Year",
        yTitle: "Count",
        link: "http://data.gov.in/catalog/outlays-department-health-agreed-planning-commission-during-tenth-plan",
        json: "https://data.gov.in/node/89699/datastore/export/json",
        title: "Outlays for Department of Health as agreed by Planning Commission during Tenth Plan",
        desc: "data related to 9th Plan Allocation, 9th Plan Anticipated Expenditure, 10th Plan Allocation as Agreed by Planning Commission."
    },
    "F-DS-4": {
        key: "F-DS-4",
        xTitle: "Year",
        yTitle: "Count",
        link: "http://data.gov.in/catalog/outlays-department-health-agreed-planning-commission-during-tenth-plan",
        json: "https://data.gov.in/node/89927/datastore/export/json",
        title: "Percentage Share of Household Expenditure on Health and Drugs in Various States during Eleventh Five Year Plan",
        desc: "data related to percentage share of household expenditure on health and drugs in various states during Eleventh Five Year Plan."
    },
    "F-DS-6": {
        key: "F-DS-6",
        xTitle: "Year",
        yTitle: "Count",
        link: "https://data.gov.in/catalog/outlay-tenth-plan-tenth-plan-sum-annual-outlay-and-tenth-plan-actual-expenditure-department",
        json: "https://data.gov.in/node/89683/datastore/export/json",
        title: "Outlay Tenth Plan, Tenth Plan (200207) Sum of Annual Outlay and Tenth Plan (200207) Actual Expenditure for Department of Health and Family Welfare",
        desc: "data related to Outlay Tenth Plan, Tenth Plan (200207) sum of Annual Outlay and Tenth Plan (2002-07) Actual Expenditure for Department of Health and Family Welfare."
    }
};
function initializeCharts()
{
    
    initializeCharts.load=Object.keys(initializeCharts.allData);
//    initializeCharts.load=["F-DS-1"];
    drawChart(initializeCharts.allData[initializeCharts.load.shift()]);
    
}

function drawChart(input)
{
    if(!input)
        return;
    $("#all_charts").append("<div id='"+input.key+"'></div>");
    $.ajax({type: "GET",
        url: input.json,
        dataType: 'json',
        async: true,
        context:input,
        success: function(result) {
            if(result.data && result.fields)
            {
                var chartData = result.data;
                var fields=[];
                for(var i=0; i<result.fields.length; i++)
                {
                    fields.push(result.fields[i].label);
                }
                for(var i=0; i<chartData.length; i++)
                {
                    for(var j=0; j<chartData[i].length; j++)
                    {
                        if(j!==0)
                            chartData[i][j]=parseFloatNan0(chartData[i][j]);
                    }
                }
                chartData.unshift(fields);
                var data = google.visualization.arrayToDataTable(chartData);
                var options = {
                    chart: {
                        title: this.title,
                        subtitle: this.desc,
                    },
                    bars: 'vertical',
                    height: 600,
                    legend: { position: 'top', alignment: 'start' },
                    hAxis: {
                        title: this.xTitle,
                        format: ''
                    },
                    vAxis: {
                        title: this.yTitle,
                        format: 'decimal'
                    }
                };
                
                var chart = new google.charts.Bar(document.getElementById(this.key));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        },
        complete: function (){
            drawChart(initializeCharts.allData[initializeCharts.load.shift()]);
        }
    });
}


function parseIntNan0(val)
{
    var n = parseInt(val);
    if (isNaN(n))
        n = 0;
    return n;
}


function parseFloatNan0(val)
{
    var n = parseFloat(val);
    if (isNaN(n))
        n = 0;
    return n;
}
