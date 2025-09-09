import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import moment from "moment";
import { colors } from "../../constants/colors";

export default function DatePicker({ minDate, selectedDate, setSelectedDate }) {
  const handlePrev = () => {
    if(selectedDate.isAfter(minDate, "day")) setSelectedDate(prev => moment(prev).subtract(1, "day"));
  };

  const handleNext = () => {
    if(!selectedDate.isSame(moment(), "day")) setSelectedDate(prev => moment(prev).add(1, "day"));
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <TouchableOpacity onPress={handlePrev} style={styles.buttonStyle} disabled={!selectedDate.isAfter(minDate, "day")}>
        <FontAwesome6 name={'chevron-left'} size={18} iconStyle="solid" color={!selectedDate.isAfter(minDate, "day") ? colors.darkGray : colors.primary} />
      </TouchableOpacity>

      {/* Date */}
      <Text style={styles.date}>
        {selectedDate.format("MMM D, YYYY")}
      </Text>

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} disabled={selectedDate.isSame(moment(), "day")}  style={styles.buttonStyle}>
        <FontAwesome6 name={'chevron-right'} size={18} iconStyle="solid" color={selectedDate.isSame(moment(), "day") ? colors.darkGray : colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 15,
    marginHorizontal: 20,
  },
  buttonStyle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    fontSize: 22,
    color: colors.primary,
    fontFamily: 'Montserrat-Medium'
  },
  date: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black
  },
});