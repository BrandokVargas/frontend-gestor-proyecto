
import { Page, Text, View, Document, StyleSheet ,Image} from '@react-pdf/renderer';
import banner from '../../assets/banner_reporte.png'
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4'
  },
  section: {
    width: '100%',
    padding: 5,
  },
  titleR: {
    color: '#134461'
  },
  img: { 
    maxHeight: "400px",
    width: "100%",
    height: "auto",
    marginBottom: "15px",
  }
});

// Create Document Component
const CantidadProyectos = ({cantidad,nombre}) => {


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.img}
          src={banner}
          alt="banner report" 
        />
        <View style={styles.section}>

          <Text style={styles.titleR}>Hola: {nombre}</Text>
          <Text style={styles.titleR}>haz realizado un reporte sobre la cantidad de proyectos.</Text>

        </View>

        <View style={styles.section}>
          <Text>Actualmente cuentas con {cantidad} proyectos creados</Text>
        </View>
      </Page>
    </Document>
  )
};

export default CantidadProyectos