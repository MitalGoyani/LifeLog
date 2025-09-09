import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import moment from 'moment';
import { colors } from '../../constants/colors';
import Header from '../common/Header';
import AddAdventure from './AddAdventure';
import DatePicker from '../common/DatePicker';

const AdventureList = () => {
  const adventureList = useSelector((state) => state.adventures);
  const [isAddModal, setAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [adventures, setAdventures] = useState({ daily: [], weekly: [], weeklyCounts: {} });

  useEffect(() => {
    // set selected date adventures
    const list = [...adventureList].filter(item => {
      return moment(moment(item?.date).format('YYYY-MM-DD')).isSame(moment(selectedDate).format('YYYY-MM-DD'), 'day')
    })
    setAdventures({ ...adventures, daily: list })
  }, [selectedDate])

  useEffect(() => {
    // set current week adventures
    const startOfWeek = moment().startOf("week").format('YYYY-MM-DD');
    const endOfWeek = moment().endOf("week").format('YYYY-MM-DD');
    const weekAdventures = [...adventureList].filter(item => {
      return moment(moment(item?.date).format('YYYY-MM-DD')).isBetween(startOfWeek, endOfWeek, undefined, '[]')
    })

    //count most frequent aventure
    const counts = Object.values(adventureList.reduce((acc, item) => {
      if (!acc[item.icon]) {
        acc[item.icon] = { icon: item.icon, title: item.title, count: 0 };
      }
      acc[item.icon].count += 1;
      return acc;
    }, {})).sort((a, b) => b.count - a.count);

    // set selected date adventures
    const list = [...adventureList].filter(item => {
      return moment(moment(item?.date).format('YYYY-MM-DD')).isSame(moment(selectedDate).format('YYYY-MM-DD'), 'day')
    })

    setAdventures({ daily: list, weekly: weekAdventures, weeklyCounts: counts })
  }, [adventureList])

  const renderItem = ({ item, index }) => (
    <View style={styles.row} key={index}>
      {/* Left side with icon + line */}
      <View style={styles.iconColumn}>
        <View style={styles.iconCircle}>
          <FontAwesome6 name={item.icon} size={20} color="white" iconStyle="solid" />
        </View>
        {/* Only render line if not last item */}
        {index !== adventures.daily.length - 1 && <View style={styles.line} />}
      </View>

      {/* Right side with text */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{moment(item.date).calendar()}</Text>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data found</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      <Header
        title={"Adventures"}
        subTitle={adventures.weekly.length > 0 ? `Total ${adventures.weekly.length} Adventures this week` : ``}
        isAdd={true}
        onAddPress={() => setAddModal(true)}
      />
      {(adventures.weeklyCounts.length > 0 && adventures.weeklyCounts[0].count > 1) && (
        <View style={styles.frequentIconWrapper}>
          <FontAwesome6 name={adventures.weeklyCounts[0].icon} size={18} iconStyle="solid" color={colors.white} />
          <Text style={styles.frequentText}>{adventures.weeklyCounts[0].title} adventure logged {adventures.weeklyCounts[0].count} times this week</Text>
        </View>
      )}
      <DatePicker
        minDate={adventureList.length > 0 ? adventureList[adventureList.length - 1].date : moment()}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text style={styles.titleText}>{adventures.daily.length > 0 ? `${adventures.daily.length} Adventures` : ``}</Text>
      <FlatList
        data={adventures.daily}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
      />
      {isAddModal && <AddAdventure visible={isAddModal} onClose={() => setAddModal(false)} />}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20
  },
  row: {
    flexDirection: "row",
    marginBottom: 40
  },
  iconColumn: {
    alignItems: "center",
    width: 60,
  },
  iconCircle: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  line: {
    position: "absolute",
    top: 40,
    bottom: -40,
    width: 1,
    backgroundColor: colors.paleGray,
    zIndex: 0,
  },
  textWrapper: {
    marginLeft: 12,
    justifyContent: "center",
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'Montserrat-Bold'
  },
  time: {
    fontSize: 13,
    color: colors.black,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'Montserrat-Bold'
  },
  frequentIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: colors.primary
  },
  frequentText: {
    fontSize: 14,
    color: colors.white,
    marginHorizontal: 15,
    fontFamily: 'Montserrat-Bold'
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'left'
  }
})


export default AdventureList;
