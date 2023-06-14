import { Page, Text, View, Document, StyleSheet ,Image} from '@react-pdf/renderer';
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
   viewHeader:{
     padding: 20,
     textAlign: "center",
     flexDirection: "row",
     justifyContent: "space-between"
   },
    viewTitle:{
     padding: 20,
     textAlign: "center",
     letterSpacing: 3,
     margin: 20
   }

});



const RProyectos = () => (
    <Document>
        <Page style={styles.body}>
          	 <View style={styles.viewHeader}>               
                 <View>
                      <Text>Logo del sistema</Text>
                 </View>

                 <View>
                   <Text>Sistema de inventario</Text>
                 </View>
             </View>
          
            <View style={styles.viewTitle}>            
               <View>
                 	<Text>------------------------------------------</Text>
               		<Text>Informe de reportes</Text>
                 	<Text>------------------------------------------</Text>
               </View>
             </View>
          
          
          
            <View style={styles.table}>


                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Tareas</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Colaboradores</Text>
                    </View>
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
              
                <View style={styles.tableRow}>
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
                        <Text style={styles.tableCell}>Estado</Text>
                    </View>
                </View>



            </View>
        </Page>
    </Document>
);

export default RProyectos;








// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// // import banner from '../assets/banner_reporte.png'
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


// const RProyectos = ({ nombre, proyectos }) => {
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <Image style={styles.img}
//                     src={banner}
//                     alt="banner report"
//                 />
//                 <View style={styles.section}>
//                     <Text style={styles.titleR}>Hola: {nombre}</Text>
//                     <Text style={styles.titleR}>haz realizado un reporte sobre la lista de proyectos.</Text>
//                 </View>
//                 <View style={styles.section}>
//                     <View>
//                         <Text>Aquí esta tu reporte: </Text>
//                         {proyectos.map((proyecto) => (
//                             <View key={proyecto._id}>
//                                 <Text style={styles.listado}>
//                                     - {proyecto.nombre}
//                                 </Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     )
// };

// export default RProyectos