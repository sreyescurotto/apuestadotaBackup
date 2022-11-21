import React from "react";
import Layout from "../components/Layout/Layout";
import PaymentReceived from "../components/paymentReceived/paymentReceived";
import withAuth from "../interceptors/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";

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

const PaymentSuccess = (props, req, res) => {
const router = useRouter();
const [user, setUser] = useState({});
const { layout, navbar, leftbar } = props;
const  { transactionToken, token, amount, orderid, api_token, ref_code }= router.query;

function authTransaction () {
  const options = {
    method: 'POST',
    url: 'https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/456879856',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    data: {
      channel: 'web',
      captureType: 'manual',
      countable: true,
      order: {
        tokenId: transactionToken,
        purchaseNumber: orderid,
        amount: `${amount}.00`,
        currency: 'PEN',
      }
    }
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      let data =
      {user_id : user.id, amount : amount, orderid : orderid, ref_code : ref_code, card : response.data.cardNumber, brand : response.data.cardBrand}
      axios.post('/api/db/deposit', data)
      .then((response) => {
        router.push('/play/normal')  })
      .catch((error) => { 
        console.log(error) })
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
      })
    });
  }

  useEffect(() => {
    let s = new AppService();
    s.makeGet("profile", {}, true).then((resp) => {
      let _user = resp.data;
      setUser(_user);
    });

    //execute function after 5 seconds
    setTimeout(function(){ authTransaction()}, 4000);
  }, []);


  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
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

          @media (max-width: 768px) {
            .mode-play {
              overflow-x: hidden;

              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  );
};

export default withAuth(PaymentSuccess);
