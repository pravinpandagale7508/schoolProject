// JavaScript source code
import { useState, useEffect, useCallback } from 'react';
import { REQUEST_ACTIONS, sendRequest, setCookie, getCookie } from '../../utils/Communicator';
import { useSelector, useDispatch } from 'react-redux';
import { URL_DATA, LANGUAGES, mailroom_id } from '../../constants/global-constants';
import {  setAdmin,setAdminList  } from '../../reducers/admin-reducers/AdminSlicer';
import { snackbarToggle } from '../../reducers/snackbarSlicer';


var bDownLoad = false;
var downLoadId = 0;

export const addAdmin = (dispatch, snackbarToggle, value, callBack) => {
   
    sendRequest(URL_DATA.ADMIN_HANDLER+"auth/signup", REQUEST_ACTIONS.POST, value, {
        successCallback: response => {
            console.log(response)
            //dispatch(addUser(response));
            if (!value.id) {
                dispatch(snackbarToggle({ type: 'success', message: 'User Created successfully' }));
            } else {
                dispatch(snackbarToggle({ type: 'success', message: 'User Updated successfully' }));
            }
            callBack();
        },
        failedCallback: error => {
            dispatch(snackbarToggle({ type: 'error', message: 'Operation failed' }));
        },
    });

}

export const updateAdmin = (dispatch, snackbarToggle, value, callBack) => {
   
    sendRequest(URL_DATA.ADMIN_HANDLER+"test/admin/update", REQUEST_ACTIONS.POST, value, {
        successCallback: response => {
            console.log(response)
            //dispatch(addUser(response));
            if (!value.id) {
                dispatch(snackbarToggle({ type: 'success', message: 'User Created successfully' }));
            } else {
                dispatch(snackbarToggle({ type: 'success', message: 'User Updated successfully' }));
            }
            callBack();
        },
        failedCallback: error => {
            dispatch(snackbarToggle({ type: 'error', message: 'Operation failed' }));
        },
    });

}



export const deleteAdmin = (dispatch, snackbarToggle, id, callBack) => {
   
    sendRequest(URL_DATA.ADMIN_HANDLER+"test/admin/delete/"+id, REQUEST_ACTIONS.DELETE, null, {
        successCallback: response => {
            console.log(response)
            dispatch(snackbarToggle({ type: 'success', message: 'User deleted successfully' }));
            callBack();
        },
        failedCallback: error => {
            dispatch(snackbarToggle({ type: 'error', message: 'Operation failed' }));
        },
    });

}
export const getAdminList = (dispatch, admin,callBack) => {
    let loginObj = { "sessionId": admin.data.session, opcode: "getAdminList" }
    sendRequest(URL_DATA.ADMIN_HANDLER+"test/admin/getAll", REQUEST_ACTIONS.GET, loginObj, {
        successCallback: (response) => {
            console.log(response)
            dispatch(setAdminList(response));
            //setIsLoaded(true);
            if(callBack){
                callBack(response)
            }
        },
        failedCallback: error => {

        }
    });
}
export const login = (dispatch, userName, password, setHasError,callback) => {
    setHasError(false);
    let loginObj = { "username": userName, "password": password, opcode: "login" }
    sendRequest(URL_DATA.ADMIN_HANDLER+"auth/signin", REQUEST_ACTIONS.POST, loginObj, {
        successCallback: (response) => {

            setCookie("SESSION_ID", response.accessToken, 30);
            callback()
            dispatch(setAdmin(response))
        },
        failedCallback: error => {
            setHasError(true);
        }
    });
}

export const logOutSystem = (dispatch, session, setHasError) => {
    setHasError(false);
    let loginObj = { "sessionId": session, opcode: "logout" }
    sendRequest(URL_DATA.ADMIN_HANDLER, REQUEST_ACTIONS.POST, loginObj, {
        successCallback: (response) => {

            if (response.misc.CODE === 1) {
                setCookie("NBO_SESSION_ID", "", 30);
                setHasError(false);
            } else {
                setHasError(true);
            }
        },
        failedCallback: error => {
            setHasError(true);
        }
    });
}
function send_data_get(url, fileName) {
    fetch(url)
        .then(response =>
            response.blob()
        )
        .then(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const downloadUrl = window.URL_DATA.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
        })
}
export const recieptWithBarCode = (dispatch, hawb, admin) => {
    var url = "/shipping/recieptWithBarCode/" + admin.data.session + "/" + hawb;
    send_data_get(url, "CWB_" + hawb);
    
}
export const scanImageForData = (dispatch, image, admin,callBack) => {
    let loginObj = { "sessionId": admin.data.session, opcode: "scanImageForData", mailroom_id: mailroom_id, call_type: "scan", image: image}
    sendRequest(URL_DATA.SHIPPING_HANDLER, REQUEST_ACTIONS.POST, loginObj, {
        successCallback: (response) => {
            console.log(response)
           // dispatch(setImageScanData(JSON.parse(response.data)));
            callBack();
            //setIsLoaded(true);
        },
        failedCallback: error => {

        }
    });
}

function convertToCSV1(items, header1) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = header1
    const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    return csv;
}

function downLoadPdf(data, fileName) {
    //var blob = new Blob([data], { type: 'text/pdf;charset=utf-8;' });
    var blob = new Blob([data]);
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(data, fileName);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = window.URL_DATA.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
};
export const exportToCsv = function (data, name, dispatch, admin) {
    var manifestItems = data.manifestItems;
    var recieptList = data.params.recieptList;

    
    for (var i = 0; i < recieptList.length; i++) {
        downLoadPdf(recieptList[i].reciept, recieptList[i].name);
    }
    //var headers = Object.keys(manifestItems[0])
    var headers = ["Sender",
        "SenderAddress",
        "SenderCountry",
        "ReceiverName",
        "ReceiverStreetAddress",
        "ReceiverZipcode",
        "ReceiverCity",
        "ReceiverCountry",
        "ReceiverPhone",
        "ReceiverEmail",
        "ReceiverReceiverId",
        "ConsignmentNumber",
        "Reference1",
        "Reference2",
        "GoodsDesc",
        "Cubic",
        "Weight ",
        "ChargeWeight",
        "Quantity",
        "DeliveryInstructions",
        "InvoiceValue",
        "InvoiceCurrency",
        "InvoiceLineQty",
        "InvoiceLineAmount",
        "OriginPort",
        "GatewayPort",
        "AgentCode",
        "CarrierPrefix",
        "MAWB",
        "HAWB",
        "FlightDate",
        "FlightTime",
        "FlightNumber",
        "ETADate",
        "SendeETATimer",
        "TotalMasterQuantity",
        "TotalMasterWeightKgm",
        "InvoiceLineOriginCountry",
        "IsAutonomy",
        "CourierAWBDate",
        "ReceiverPassportId",
        "ReceiverPassportCountry",
        "FreightTotalAmount",
        "FreightCurrency",
        "DeliveryMethod",
        "TotalPackageInMawb",
        "TotalShipment",
        "CrateNumber",
        "StorageSiteCode",
        "Amount to be Charge In Nis",
        "Amount to be Charge In Nis1",
        "Amount to be Charge In Nis2",
        "Amount to be Charge In Nis3",
        "Amount to be Charge In Nis4",
        "Receipt Number"
    ]
    exportCSVFile(headers, manifestItems, name);
    for (var i = 0; i < manifestItems.length; i++) {
        sleep(1000)
        console.log(manifestItems[i].ConsignmentNumber)
        recieptWithBarCode(dispatch, manifestItems[i].ConsignmentNumber, admin)
    }
}
function exportCSVFile(headers, items, fileTitle) {

    var csv = convertToCSV1(items, headers);

    var exportedFilenmae = fileTitle;

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            try {
            var url = window.URL_DATA.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
                document.body.removeChild(link);
            } catch (err) {
                if (err.message) {
                    console.log(err.message)
                }
                console.log(err)
            }

        }
    }
}