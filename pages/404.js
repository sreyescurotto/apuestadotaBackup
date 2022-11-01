import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();
    return <>
        <div style={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
                gap:"20px"
            }
        }>
            <h3> BOTA TU GAAA para que se arregle la página</h3>
            <p> Estamos trabajando para solucionarlo</p>
            <button className="btn btn-md" onClick={
                () => {
                    router.push("/");
                }
            }>
                Volver a la página principal
            </button>

        </div>
        
    </>
}