'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var t0 = performance.now();
var util = require('util');
var hana = require('@sap/hana-client');
var bodyParser = require('body-parser')

const cors = require('cors')

const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



var connOptions = {
    serverNode: 'zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com:32220',
    UID: 'DPFADMIN',
    PWD: 'Welcome01',
    encrypt: 'true',  //Must be set to true when connecting to SAP HANA Cloud
    sslValidateCertificate: 'false',  //Must be set to false when connecting
    //to a HANA, express instance that uses a self signed certificate.

    //Below setting is used to specify where the trust store is
    // ssltruststore: '/home/dan/.ssl/trust2.pem',

    //Alternatively provide the contents of the certificate directly (DigiCertGlobalRootCA.pem)
    ssltruststore: '-----BEGIN CERTIFICATE-----MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBhMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBDQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsBCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7PT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbRTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUwDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/EsrhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJFPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0lsYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQkCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=-----END CERTIFICATE-----'
};

var connection = hana.createConnection();

// request for buildings
app.get('/building', function (req, res) {
    // res.send('LALALALALALALA');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    /*
        TODO: get data from the database
    
    */
    connection.connect(connOptions, function (err) {
        if (err) throw err;
        connection.exec(`SELECT *
        FROM _GEBAEUDE`, function (err, result) {
            if (err) throw err;

            console.log(result);
            res.send(result);
            // output --> Name: Tee Shirt, Description: V-neck
            connection.disconnect();
        })
    });

});


// request for radar system
app.get('/system', function (req, res) {
    // res.send('LALALALALALALA');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    /*
        TODO: get data from the database
    
    */
    connection.connect(connOptions, function (err) {
        if (err) throw err;
        connection.exec(`SELECT *
        FROM RADARSYSTEM`, function (err, result) {
            if (err) throw err;

            console.log(result);
            res.send(result);
            // output --> Name: Tee Shirt, Description: V-neck
            connection.disconnect();
        })
    });

});

// request for rooms
app.get('/rooms/:id', function (req, res) {
    // res.send('LALALALALALALA');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    /*
        TODO: get data from the database
    
    */
    connection.connect(connOptions, function (err) {
        if (err) throw err;
        connection.exec(`SELECT *
        FROM  _RAUM
        WHERE _RAUM._GEBAEUDE_ID = ${req.params.id}`, function (err, result) {
            if (err) throw err;

            console.log(result);
            res.send(result);
            // output --> Name: Tee Shirt, Description: V-neck
            connection.disconnect();
        })
    });

});

//  TODO: post or put?
app.post('/radar_data',
    // validation
    function (req, res, next) {
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (!req.body.name) {
            return res.status(400).send("the name cannot be null")
        }
        if (!req.body.room) {
            return res.status(400).send("please select a room")
        }
        next();
    },


    function (req, res, next) {
        // console.log(req.params);
        // validation
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        var params = {
            "name": req.body.name,
            "in": parseInt(req.body.in),
            "out": parseInt(req.body.out),
            "room": parseInt(req.body.room),
            "unifiedid": parseInt(req.body.unifiedid),
        }
        // var name = params.name;

        /* 
        
            TODO: 
            - resolve JSON data
            - establish connection with SAP HANA Database
            - update the data to the database
    
        */
        console.log(typeof params.name)

        connection.connect(connOptions, function (err) {
            if (err) {
                return console.error(err);
            }
            var sql = `INSERT INTO RADARSENSOR(_POSITIONIN,_POSITIONOUT,_UNIFIEDRADARID,_RAUM_ID,_NAME) VALUES(${params.in},${params.out},${params.unifiedid},${params.room},'${params.name}');`;
            // var sql = `INSERT INTO RADARSENSOR(_NAME,_POSITIONIN,_POSITIONOUT,_UNIFIEDRADARID,_RAUM_ID) VALUES('haha',1,0,2,1);`;
            var rows = connection.exec(sql, function (err, rows) {
                if (err) {
                    return console.error(err);
                }
                console.log(util.inspect(rows, { colors: false }));
                var t1 = performance.now();
                console.log("time in ms " + (t1 - t0));
                connection.disconnect(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
        });


        res.status(201).send("success");
    })

const port = process.env.PORT || 3030;
app.listen(port, function () {
    console.log('myapp listening on port ' + port);
    // connection.connect(connOptions, function (err) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     var sql = 'CREATE TABLE test(a INT, b INT, c INT);';
    //     var rows = connection.exec(sql, function (err, rows) {
    //         if (err) {
    //             return console.error(err);
    //         }
    //         console.log(util.inspect(rows, { colors: false }));
    //         var t1 = performance.now();
    //         console.log("time in ms " + (t1 - t0));
    //         connection.disconnect(function (err) {
    //             if (err) {
    //                 return console.error(err);
    //             }
    //         });
    //     });
    // });
});

// connection.connect(connOptions, function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     var sql = 'CREATE TABLE test(a INT, b INT, c INT);';
//     var rows = connection.exec(sql, function (err, rows) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log(util.inspect(rows, { colors: false }));
//         var t1 = performance.now();
//         console.log("time in ms " + (t1 - t0));
//         connection.disconnect(function (err) {
//             if (err) {
//                 return console.error(err);
//             }
//         });
//     });
// });




















/*

 test

*/

// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// const port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log('myapp listening on port ' + port);
// });

// 'use strict';
// const { PerformanceObserver, performance } = require('perf_hooks');
// var t0 = performance.now();
// var util = require('util');
// var hana = require('@sap/hana-client');

// var connOptions = {
//     serverNode: 'wsproxy.hana.prod.eu-central-1.whitney.dbaas.ondemand.com:80',
//     UID: 'changhong9696@gmail.com',
//     PWD: 'iDa520hc!ileen',
//     encrypt: 'true',  //Must be set to true when connecting to SAP HANA Cloud
//     sslValidateCertificate: 'false',  //Must be set to false when connecting
//     //to a HANA, express instance that uses a self signed certificate.

//     //Below setting is used to specify where the trust store is
//     //ssltruststore: '/home/dan/.ssl/trust2.pem',

//     //Alternatively provide the contents of the certificate directly (DigiCertGlobalRootCA.pem)
//     //ssltruststore: '-----BEGIN CERTIFICATE-----MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBhMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBDQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsBCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7PT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbRTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUwDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/EsrhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJFPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0lsYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQkCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=-----END CERTIFICATE-----'
// };

// var connection = hana.createConnection();
// connection.connect(connOptions, function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     var sql = 'SELECT TITLE,NUMBER from DBFHANA.TEST;';
//     var rows = connection.exec(sql, function (err, rows) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log(util.inspect(rows, { colors: false }));
//         var t1 = performance.now();
//         console.log("time in ms " + (t1 - t0));
//         connection.disconnect(function (err) {
//             if (err) {
//                 return console.error(err);
//             }
//         });
//     });
// });