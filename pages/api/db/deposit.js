import excuteQuery from "../../../lb/db";

export default async function handler(req, res) {
    const {  user_id, amount, orderid, ref_code, card, brand, trans_date  } = req.body;
   try {
        if(ref_code != null){
            const result3 = await excuteQuery({
                query: 'SELECT id FROM usuario WHERE ref_code = ?',
                values: [ref_code]
            });

            const result22 = await excuteQuery({
                query: 'SELECT id FROM `deposito` WHERE usuario_id = ? AND tipo = 1',
                values: [user_id]
            })


            if(result3.length > 0 && result3[0].id != user_id && result22.length == 0){

                const userid = result3[0].id;

                const bo = amount * 0.1;

                const bono = amount + bo;

                const unsol = 1;

                const result = await excuteQuery({
                    query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, tarjeta_marca, tarjeta_numero, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    values: ['DEPÓSITO', user_id, amount, ref_code, 1, 1, 'izipay', orderid, brand, card, trans_date ]
                    });

                const result2 = await excuteQuery({
                    query: 'UPDATE usuario SET balance = balance + ? WHERE id = ?',
                    values: [bono, user_id]
                    });

                const result4 = await excuteQuery({
                    query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    values: ['BONO 10%', user_id, bo, ref_code, 3, 1, 'sistema', orderid, trans_date ]
                    });


                 const result5 = await excuteQuery({
                    query: 'UPDATE usuario SET balance = balance + ? WHERE id = ?',
                    values: [unsol, userid]
                    });

                const result6 = await excuteQuery({
                    query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    values: ['BONO POR REFERIDO', userid, unsol, null, 3, 1, 'sistema', orderid, trans_date ]
                    });

                res.status(200).json({ message: `Deposito correctamente registrado al codigo de referido ${ref_code}, bonos entregados` });

            } else {

                 const result7 = await excuteQuery({
                    query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, tarjeta_marca, tarjeta_numero, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    values: ['DEPÓSITO', user_id, amount, null, 1, 1, 'izipay', orderid, brand, card, trans_date ]
                    });
        
                const result8 = await excuteQuery({
                    query: 'UPDATE usuario SET balance = balance + ? WHERE id = ?',
                    values: [amount, user_id]
                    });

                res.status(200).json({ message: 'Codigo de referido invalido, pero se realizo el deposito igualmente' });
            }
        } else {
            //continue with the process without ref_code
            const result9 = await excuteQuery({
                query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, tarjeta_marca, tarjeta_numero, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                values: ['DEPÓSITO', user_id, amount, null, 1, 1, 'izipay', orderid, brand, card, trans_date ]
                });
    
            const result10 = await excuteQuery({
                query: 'UPDATE usuario SET balance = balance + ? WHERE id = ?',
                values: [amount, user_id]
                });
            res.status(200).json({ message: 'success' });
        }
        //     res.status(200).json({ message: 'success' });
    } catch ( error ) {
        console.log( error );
    }
//  res.status(200).json(req.body.user_id);
}