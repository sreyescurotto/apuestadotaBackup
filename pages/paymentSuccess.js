
import React from "react";
import Layout from "../components/Layout/Layout";
import PaymentReceived from "../components/paymentReceived/paymentReceived";
import withAuth from "../interceptors/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppService from "../services/app.service";
import Swal from "sweetalert2";
import axios from "axios";


export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);
  return {
    props: {
      layout: response.default.layout,
      navbar: response.default.navbar,
      leftbar: response.default.leftbar,
    },
  };
}


const PaymentSuccess = (props) => {

const router = useRouter();
const [user, setUser] = useState({});
const [loading, setLoading] = useState(true);
const { layout, navbar, leftbar } = props;
const { transactionToken, token, amount, orderid, ref_code } = router.query;

//async 

function authTransaction (a, b, c, d) {
  setLoading(false);
  const options = {
    method: "POST",
    url: 'https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/650221602',
    headers: {
      "Content-Type": "application/json",
      "Authorization": a,
    },
    data: {
      channel: "web",
      captureType: "manual",
      countable: true,
      terminalId: "1",
      terminalUnattended: false,
      order: {
        tokenId: b,
        purchaseNumber: c,
        amount: `${d}.00`,
        currency: "PEN"
      }, 
      
    }
  };
  axios
    .request(options)
    .then(function (response) {
      if(response.data.dataMap !== null && response.data.dataMap !== undefined){
      sendDatatoDB(response.data); 
      }else{
        Swal.fire({
          icon: "error",
          title: "Error al procesar tu pago...",
          text: "Parece que hubo un error con tu medio de pago",
        });
      }
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha habido un error al procesar el pago',
      });
    });
  }


  function sendDatatoDB (r) {
    let data = {
      user_id : user.id, 
      amount : amount, 
      orderid : orderid, 
      ref_code : ref_code, 
      card : r.dataMap.CARD, 
      brand : r.dataMap.BRAND, 
      trans_date : r.order.transactionDate
    }
    axios.post('/api/db/deposit', data)
      .then((response) => {
        router.push('/play/normal') })
      .catch((error) => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error con tu pago!',
        });
      })
  }

  // const [initialValue,setInitialValue]=useState(null)
  // useEffect(()=>{
  //    if(props.initialValue!=null){
  //       setInitialValue(props.initialValue)
  //    }
  // },[props.initialValue])
  // return (
  //    <Editor
  //       initialValue={initialValue?initialValue:""} />)
// useEffect(()=>{
//   if(!router.isReady) return;
//   // codes using router.query
//   else {
//   authTransaction();}

// }, [router.isReady]);

  useEffect(() => {
    let s = new AppService();
    s.makeGet("profile", {}, true).then((resp) => {
      let _user = resp.data;
      setUser(_user);
    });
    
  }, []);

  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
          {/*  */}
          <button onClick={()=> authTransaction(token, transactionToken, orderid, amount)}  className={loading ? 'btn btn-md buttonrandom' : 'btn btn-md buttonrandom buttonrandomdisable'}>
          {
            loading ? 'Empezar a jugar' : 'Cargando ...'
          } </button>
          <div className="interface">
          
           <PaymentReceived />
          </div>
        </Layout>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;

            overflow-y: hidden;
          }

          .interface {
            background-color: #2C62FE;
          }

          .buttonrandom {
            position: absolute;
            z-index: 22;
            left: 49%;
            bottom: 10%;
          }

          .disable {
            pointer-events: none;
          }

          .buttonrandomdisable {
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .mode-play {
              overflow-x: hidden;

              overflow-y: scroll;
            }
            .buttonrandom {
              left: 26%;
            }
          }
        `}
      </style>
    </>
  );
};

export default withAuth(PaymentSuccess);
