import { StatusBar } from 'expo-status-bar';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { SegmentedButtons, MD3LightTheme, PaperProvider } from 'react-native-paper';
import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InsetShadow from 'react-native-inset-shadow';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  HexColorPicker,
} from "react-colorful";

import ColorPicker from 'react-native-wheel-color-picker'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';

const Stack = createStackNavigator();

const MyTheme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#bbe5fa',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    secondaryContainer: '#afe1fa',
    backgroundColor: '#bbe5fa'
  },
};

const termTheme = {
  
};

function CoursePage({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Course Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function Task ({navigation, ...props}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
  <Pressable
    style={[styles.shadow,{
      flex:1,
      width: '80%',
      height: 60,
      backgroundColor: 'white',
      marginTop:20,
      color:'black',
      borderRadius:5,
      flexDirection:'row',
      justifyContent:'space-between',
    }]}
    //onPress={(newValue) => setToggleCheckBox(newValue)}
    >  
      
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
        margin={15}
        alignSelf='center'
        style={{
          width: 35,
          height: 35,
        }}
      />
      <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',marginRight:10}}>
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:18, margin:5}}>{props.taskname}</Text>
          <Text style={{fontSize:12, margin:5}}>{props.course}</Text>
        </View>
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:18, marginBottom:5}}>{props.duedate}</Text>
          <Text style={{fontSize:12}}>{props.duetime}</Text>
        </View>
      </View>
      
      
  </Pressable>
  );
};

const Course = ({navigation, ...props}) => (
  <Pressable 
    style={{ 
      flex:1,
      width: '80%', 
      height: 100, 
      backgroundColor: props.color, 
      marginTop:20, 
      color:props.textColor, 
      alignItems:'flex-end', 
      flexDirection:'row',
      justifyContent:'space-between',
      borderRadius:10,
    }}
    onPress={() => navigation.navigate('CoursePage')}
    >
      <Text style={{fontSize:24, color:props.textColor, margin:15}}>{props.name}</Text>
      <Text style={{fontSize:18, color:props.textColor, margin:15}}>{props.term}</Text>
  </Pressable>
);

function HomeScreen({navigation}) {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const addCourse = (backgroundColor, textColor, name, term) => {
    setCourses([...courses, <Course color={backgroundColor} textColor={textColor} name={name} term={term}/>]);
    setAddNew(false);
    setText('');
    setValue('');
    setTerm('');
  };

  const addTask = (taskname, course, duetime, duedate) => {    
    setTasks([...tasks, <Task taskname={taskname} course={course} duetime={duetime} duedate={duedate}/>]);
    setAddNew(false);
    setText('');
    setValue('');
    setDate(new Date());
  };

  const defaultFilter = () => {
    setFilteredTasks(tasks);
  };

  const removeCourse = () => {
    setCourses(courses.slice(0, -1));
  };

  const getDateTime = (date) => {
    var d = date;
    var hour = d.getHours();
    var minute = d.getMinutes();
    var ampm = 'am';
    if (hour > 12) {
      hour -= 12;
      ampm = 'pm';
    }
    if(minute <10){
      minute = '0' + minute;
    }
    return hour + ':' + minute + ampm;
  };

  const getDateDay = (date) => {
    var d = date;
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    if(month <10){
      month = '0' + month;
    };
    if(day <10){
      day = '0' + day;
    };
    return day + '/' + month;
  };

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Modal visible={addNew} animationType='slide'>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          
          <Text style={{fontSize:24, alignSelf:'flex-start', marginLeft:'10%'}}>Add New Task</Text>
          <View style={{flexDirection:'row', width:'80%', gap:'20%', margin:20}}>
            <TextInput style={{height: 40, borderWidth: 1, padding: 10, width:'60%', borderRadius:5}} 
              placeholder='Task' 
              placeholderTextColor={'grey'}
              maxLength={15} 
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
            <TextInput style={{height: 40, borderWidth: 1, padding: 10, width:'33%', borderRadius:5}} 
              placeholder='Course' 
              placeholderTextColor={'grey'}
              maxLength={9} 
              autoCapitalize='characters'
              onChangeText={courseName => setCourseName(courseName)}
              defaultValue={courseName}
            />
          
          </View>
          <Text style={{fontSize:18, alignSelf:'flex-start', marginLeft:'10%'}}>Due Date:</Text>
          <SafeAreaView style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
            
            <DateTimePicker
                style={{borderRadius:0, marginLeft:20, marginTop:10}}
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
              <DateTimePicker
                style={{borderRadius:0, marginRight:20, marginTop:10}}
                testID="dateTimePicker"
                value={date}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
              />
              
          </SafeAreaView>
          {/* <Text>selected: {date.toLocaleString()}</Text> */}
            {/* <SafeAreaView style={{width:'80%'}}>
              <SegmentedButtons
                value={value}
                theme={{roundness: 0}}
                onValueChange={setValue}
                buttons={[
                  {
                    value: 'Summer',
                    label: 'Summer',
                    style: {
                      borderColor:'black',
                      borderRadius: 0,
                    },
                  },
                  {
                    value: 'Fall',
                    label: 'Fall',
                    style: {
                      borderColor:'black',
                      borderRadius: 0,
                    },
                  },
                  { value: 'Winter', 
                    label: 'Winter', 
                    style: {
                      borderColor:'black',
                      borderRadius: 0,
                    },
                  },
                ]}
                
              />
            </SafeAreaView> */}
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
            <Button title="Close" onPress={() => setAddNew(false)} />
            <Button title="Add"  onPress={() => addTask(text, courseName, getDateTime(date), getDateDay(date))} />
          </View>
          
        </View>
      </Modal>

      <View style={[styles.upcoming, styles.shadow]}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:28, margin:20, alignSelf:'flex-start'}}>Dashboard</Text>
          <View style={{flexDirection:'row'}}>
            <InsetShadow containerStyle={{width:75, height:40, marginTop:20, marginRight:20, borderRadius:10, justifyContent:'center',backgroundColor: '#ccecfc',}}>
              <Text style={{alignSelf:'center', fontWeight:'bold'}}>{getDateDay(date)}</Text>
            </InsetShadow>
          </View>
        </View>
        <View style={{flex:2, flexDirection:'row', alignSelf:'center'}}>
          <InsetShadow shadowRadius={3} containerStyle={styles.taskboxes}>
            <Text style={{fontSize:16, margin:15}}>Next Deadline:</Text>
            <Text style={{fontSize:32, margin:5}}>110:24</Text>
          </InsetShadow>
          <InsetShadow shadowRadius={3} containerStyle={styles.taskboxes}>
            <Text style={{fontSize:16, margin:15}}>Tasks Left:</Text>
            <Text style={{fontSize:32, margin:5}}>{tasks.length}</Text>
          </InsetShadow>
        </View>
        
      </View>
      <View style={{flex:1, flexDirection:'row', width:'90%'}}>
        <Text style={{fontSize:28, alignSelf:'flex-start'}}>Tasks</Text>
        <View style={{flex:1,flexDirection:'row', justifyContent:'flex-end', gap:10}}>
        <TouchableOpacity onPress={() => setAddNew(true)}>
            <Icon name='options' size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddNew(true)}>
            <Icon name='add-circle-outline' size={30} />
          </TouchableOpacity>

        </View>
        
      </View>
      {tasks}
      <StatusBar style="auto" backgroundColor='#bbe5fa' />
    </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <PaperProvider theme={MyTheme}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          // screenOptions={{
          //   cardStyle: {
          //     backgroundColor: "white",
          //   }
          // }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Course" component={CoursePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  upcoming:{
    width: '90%',
    height: 250,
    backgroundColor: '#d9f1fc',
    borderRadius:10,
    margin:20,

  },
  taskboxes:{
    width: 140,
    height: 120,
    margin: 15,
    borderRadius:10,
    backgroundColor: '#ccecfc',
    alignItems:'center',
  },
  shadow:{
    shadowOffset: {width: 0, height: 1},  
    shadowColor: '#171717',  
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
  },
  course:{
    width: 100,
    height: 100,
  },
  newCourse:{
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
