import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AppService from "../../services/app.service";

const ReferidosAll = () => {
    
    const [referidos, setReferidos] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(()=>{
        setSearching(true);
        let s = new AppService();
        s.makeGet('referidos', {}, true).then(resp=>{
            setReferidos(resp.data.map(i=>{
                i.created_at = dayjs(i.created_at).format('DD/MM/YYYY hh:mm a');
                return i;
            }));
            setSearching(false);
        });
    }, []);

    return <>
        <div className="mode-bets-a">
                <h3 className="solo--title">Mis referidos</h3>
            <div >
                <table className='desktop-table background-gradient-1'>
                    <thead>
                        <tr>
                            <th>Fecha</th>   
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        { searching && <tr><td colSpan="2">Buscando referidos</td></tr> }
                        { !searching && referidos.length < 1 && <tr><td  colSpan="2" className="gc-record-not-found">Por el momento nadie ha utilizado tu código</td></tr> }
                        { !searching && 
                        referidos.map((referido, index)=>{
                            return <tr key={'referido_' + index}>
                                <td>{ referido.created_at }</td>
                                <td>
                                    <div className="userinfo">
                                        <div><img src={referido?.usuario?.foto}/></div>
                                        <div>{ referido?.usuario?.nickname }</div>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>  
        <style jsx>{`
            .mode--solo--c {
                padding: 1rem 2rem;
            }
            .desktop-table {
                padding: 20px;
                margin-top: 20px;
                width:100%;
            }
          
            .userinfo {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
            .userinfo img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
        `}</style>
    </>;
}

export default ReferidosAll;