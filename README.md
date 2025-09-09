# Adventure Tracker App - LifeLog

A simple **React Native** app to track and display your adventures. The app allows you to view a list of adventures, see weekly totals, most frequent adventure, and add new adventures with a title and icon.

---

## Features

- **Adventure List:** Displays all adventures with their title, icon, and date.
- **Weekly Summary:** Shows the total number of adventures in the current week.
- **Most Frequent Adventure:** Highlights the adventure you did most frequently.
- **Date Picker:** Filter adventures by a specific day.
- **Add Adventure:** Add a new adventure using a title and icon via a form with a submit button.
- **Persistent Storage:** All adventures are saved locally using **Redux Persist**, so data remains even after app restarts or hard refreshes.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/MitalGoyani/LifeLog.git
cd LifeLog

#Install dependencies:
npm install
# or
yarn install

#Install the pod for IOS
cd ios && pod install

#Run the app:
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS


##Dependencies

react-native ^0.81.1

react ^19.1.0

@reduxjs/toolkit

react-redux

redux-persist

@react-native-async-storage/async-storage

react-native-vector-icons/fontawesome6

moment

react-native-toast-message

react-native-safe-area-context

##File Structure
/src
  /components
    /screens
        AdventureList.js
        AddAdventure.js
    /common
        Header.js
        DatePicker.js
        PopUp.js
  /redux
    store.js
    /slices
        adventureSlice.js
  /assets
    fonts/
App.js

##Android app APK link
https://drive.google.com/file/d/10q2NEW0nqPbt6TTQ1SE0bq-nOrYzSkqV/view?usp=sharing

## App Video
https://drive.google.com/file/d/1-qhBMpjbkwf3b0w1Kxdp6uNheX4wvMv1/view?usp=sharing
