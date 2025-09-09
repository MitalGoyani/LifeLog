import { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import Header from '../common/Header';
import { addAdventure } from '../../redux/slices/adventureSlice';
import { colors } from '../../constants/colors';
import Popup from '../common/Popup';

const AddAdventure = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const iconList = ['person-biking', 'book-open-reader', 'music', 'camera', 'mountain-sun', 'palette', 'utensils', 'tree', 'rainbow', 'mug-hot']
    const [adventure, setAdventure] = useState({ title: '', icon: iconList[0], date: new Date().toISOString() });
    
    function handleChange(key, value) {
        setAdventure({ ...adventure, [key]: value })
    }

    function handleSubmit() {
        if(adventure.title.trim() == '') {
            Popup.error('Please enter title');
        } else {
            dispatch(addAdventure(adventure));
            setTimeout(() => Popup.success('Adventure added successfully'), 300);
            onClose();
        }
    }

    return (
        <Modal animationType="none" visible={visible} transparent>
            <View style={styles.modalBackground}>
                <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Header title={'Add Adventure'} subTitle={''} />
                    <View style={styles.fieldsWrapper}>
                        {/* Title */}
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={adventure.title}
                            onChangeText={(text) => handleChange('title', text)}
                            autoFocus={true}
                        />
                        {/* Icon Picker */}
                        <Text style={styles.label}>Icon</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.container}
                            keyboardShouldPersistTaps={'handled'}
                        >
                            {iconList.map((icon, index) => (
                                <TouchableOpacity key={index} style={[styles.item, { backgroundColor: icon == adventure.icon ? '#6C5CE7' : '#f2f2f2' }]} onPress={() => handleChange('icon', icon)}>
                                    <FontAwesome6 name={icon} size={24} iconStyle="solid" color={icon == adventure.icon ? '#FFFFFF' : 'black' } />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            {/* Cancel Button */}
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => onClose()}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.text, styles.cancelText]}>Cancel</Text>
                            </TouchableOpacity>

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={() => handleSubmit()}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.text, styles.submitText]}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <Toast />
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
        overflow: 'hidden'
    },
    headerStyle: {
        paddingHorizontal: 0
    },
    fieldsWrapper: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: colors.paleGray,
        borderRadius: 5,
        padding: 14,
        marginBottom: 20,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-Medium'
    },
    dateButton: {
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    container: {
        alignItems: "center",
        // marginLeft: -8
    },
    item: {
        alignItems: "center",
        marginHorizontal: 8,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray
    },
    buttonContainer: {
        flexDirection: "row",        
        justifyContent: "center",   
        alignItems: "center",
        marginTop: 30,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginHorizontal: 10,
        minWidth: 100,
        alignItems: "center"
    },
    cancelButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.darkGray,
    },
    cancelText: {
        color: "#555"
    },
    submitButton: {
        backgroundColor: colors.primary,
    },
    submitText: {
        color: colors.white, 
    },
    text: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold'
    },
});

export default AddAdventure