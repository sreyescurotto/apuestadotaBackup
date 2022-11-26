import React from 'react'
import Swal from "sweetalert2";
import axios from "axios";





export default function payment(token, transactionToken, orderid, amount, user_id) {

    const options = {
        method: "POST",
        url: 'https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/456879856',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        data: {
          channel: "web",
          captureType: "manual",
          countable: true,
          terminalId: "1",
          terminalUnattended: false,
          order: {
            tokenId: transactionToken,
            purchaseNumber: orderid,
            amount: `${amount}.00`,
            currency: "PEN"
          }, 
          
        }
      };
      axios
        .request(options)
        .then(function (response) {
          sendDatatoDB(response.data); 
        })
        .catch(function (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha habido un error al procesar el pago',
          });
        });

        
    function sendDatatoDB (r) {
        let data = {
          user_id : user_id, 
          amount : amount, 
          orderid : orderid, 
          ref_code : ref_code, 
          card : r.dataMap.CARD, 
          brand : r.dataMap.BRAND, 
          trans_date : r.order.transactionDate
        }
        axios.post('/api/db/deposit', data)
          .then((response) => {
            router.push('/play/normal');  })
          .catch((error) => { 
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          })
      }

    

        
        }
    
      
       

