import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

const Header = ({ title, subTitle, isAdd, onAddPress, headerStyle }) => {
  return (
    <View style={[styles.headerWrapper, headerStyle]}>
        <View>
            <Text style={styles.titleText}>{title}</Text>
            {subTitle !== '' && <Text style={styles.subTitleText}>{subTitle}</Text>}
        </View>
        {isAdd && 
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                <FontAwesome6 name={'plus'} size={24} iconStyle="solid" color={'black' } />
            </TouchableOpacity>
        }
    </View>
  )
};

const styles = StyleSheet.create({
	headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
		paddingLeft: 20,
        paddingVertical: 12,
        backgroundColor: '#f2f2f2'
	},
    titleText: {
        fontSize: 22,
        fontFamily: 'Montserrat-Bold'
    },
    subTitleText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        marginTop: 5
    },
    addButton: {
        borderRadius:4,
        height: 42,
        width: 56,
        alignItems: "center",
        justifyContent: 'center'
    },
    addIconStyle: {
        height: 20,
        width: 20
    }
})


export default Header;
