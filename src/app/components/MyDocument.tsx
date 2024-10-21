'use client';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
function MyDocument(){
    const styles=StyleSheet.create({
        page:{
            position:"relative",
            flexDirection:'row',
            backgroundColor: '#E4E4E4',
            border:"1px solid red",
        },
        section:{
            margin:10,
            padding:10,
            flexGrow:1,
            border:"1px solid red",
        },
        title:{
            fontSize:50,
            textAlign:'center'
        }
    })
    return(
        <Document>
            <div style={styles.title}>PDFTITLE</div>
            <hr />
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <view style={styles.section}>
                    <Text>Section #2</Text>
                </view>
            </Page>
        </Document>
    )
}
export default MyDocument;