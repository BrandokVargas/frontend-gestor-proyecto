import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { formatearFecha } from '../../helpers/formatearFecha';
import Barra from '../grafico/Barra';
import Logo from '../../assets/LogoOgily.png'


const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,

    },
    tableHeader: {
        backgroundColor: "#A23427",
        color: "white",


    },
    tableRow: {
        flexDirection: "row",

    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        padding: 10,
        borderBottomWidth: 1,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 13,

    },
    viewHeader: {
        padding: 20,
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewTitle: {
        padding: 5,
        textAlign: "center",
        letterSpacing: 3,
        margin: 30
    },
    estadistica:{
        color: "#2A120A",
        textAlign: "center",
        marginTop: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#A23427',
        marginTop: 4,
    },
    sistema: {
        padding: "8px",
    },
});



const RTareas = ({ tareas,nombre}) => {


    const handleCompleCount = tareas?.reduce((count, tarea) => {
        if (tarea.estado) {
            return count + 1;
        } else {
            return count;
        }
    }, 0);


   
    const calcularPorcentaje = () => {
        let total = tareas?.length;
        let porcentaje  = Math.round((handleCompleCount / total) * 100);
        return isNaN(porcentaje) ? 0 : porcentaje;  
    }

    return (
        <Document>

            <Page style={styles.body}>

                <View style={styles.viewHeader}>
                    
                    <Image src={Logo} style={{maxWidth: "70px",maxHeight: "70px"}}/>
                    

                    <View style={styles.sistema}>
                        <Text>{nombre}</Text>
                    </View>
                </View>

                <View style={styles.viewTitle}>
                    <View>
                        
                        <Text>Informe de reportes</Text>
                        {/* <Text>------------------------------------------</Text> */}
                        <View style={styles.line}>
                            
                        </View>
                    </View>
                </View>



                <View style={styles.table}>


                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Tareas</Text>
                        </View>
                        {/* <View style={[styles.tableCol, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Colaboradores</Text>
                    </View> */}
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Fecha de Entrega</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Prioridad</Text>
                        </View>

                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Estado</Text>
                        </View>
                    </View>

                    {/* <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Diseñar bd ventas</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Patin</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>26/06/2023</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Alta</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Completa</Text>
                    </View>
                </View> */}

                    {tareas?.map((tarea) => (
                        <View key={tarea._id} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{tarea.nombre}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{formatearFecha(tarea.fechaEntrega)}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{tarea.prioridad}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{tarea.estado ? 'Completado' : 'Incompleta'}</Text>
                                {/* <Text style={styles.tableCell}>{handleCompleCount(tarea)}</Text> */}
                            </View>
                        </View>
                    ))}



                    <View style={styles.estadistica}>
                        <View >
                            <Text>Estas fueron tus estádisticas de tareas completadas</Text>
                        </View>

                        <View>
                            
                        <Barra porcentaje={calcularPorcentaje()} />
         
                            <View>
                                <Text>{calcularPorcentaje()}%</Text>
                            </View>
                        </View>

                    </View>



                </View>
            </Page>
        </Document>
    );
};

export default RTareas;


// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import banner from '../../assets/banner_reporte.png'
// // Create styles
// const styles = StyleSheet.create({
//     page: {
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         width: '100%',
//         padding: 5,
//     },
//     titleR: {
//         color: '#134461'
//     },
//     img: {
//         maxHeight: "400px",
//         width: "100%",
//         height: "auto",
//         marginBottom: "15px",
//     },
//     listado: {
//         display: "flex",
//         flexDirection: "column",
//         color: '#EA7A7A'
//     }
// });


// const RTareas = ({nombre,tareas }) => {
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <Image style={styles.img}
//                     src={banner}
//                     alt="banner report"
//                 />
//                 <View style={styles.section}>
//                     <Text style={styles.titleR}>Hola: {nombre}</Text>
//                     <Text style={styles.titleR}>haz realizado un reporte sobre tus tareas</Text>
//                 </View>
//                 <View style={styles.section}>
//                     <View>
//                         <Text>Aquí esta tu reporte: </Text>
//                         {tareas?.map((tarea) => (
//                             <View key={tarea._id}>
//                                 <Text style={styles.listado}>
//                                     - {tarea.nombre}
//                                 </Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     )
// };

// export default RTareas