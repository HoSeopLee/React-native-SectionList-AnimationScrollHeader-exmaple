import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const HEADER_MAX_HEIGHT = 360; //이미지 및 위 쪽 영역 부분
const HEADER_MIN_HEIGHT = 50; //헤더 크기 및 최소 줄임 크기 영역
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // 계산식

const DATA = [
  {
    title: 'Detail',
    data: [],
  },
  {
    title: 'Tab',
    data: new Array(200).fill(10),
  },
];
export default function App(props) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    //뷰크기 조절 (상단)
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    //뷰크기에 맞춰 이미지 조절 (이미지가 필요 없을때는 사용안해도됨 )
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerOpacity = scrollY.interpolate({
    //최초떠있는 뷰 크기 zindex 및 opactiy 영역
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const headerOpacity_2 = scrollY.interpolate({
    //스크롤 후 뷰 크기 zindex 및 opactiy 영역
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      {/* 상단 노치영역 색상 변경(IOS only) */}
      <SafeAreaView style={{flex: 0, backgroundColor: '#fff', zIndex: 1}} />
      <SafeAreaView style={{flex: 1}}>
        <Animated.View
          style={[
            {
              width: '100%',
              position: 'absolute',
              backgroundColor: '#62d1bc',
              overflow: 'hidden',
              opacity: headerOpacity_2,
              zIndex: headerOpacity_2,
              top: 0,
              height: HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT, //헤더영역을 안더해주면 및에 하단 빈 여백이 생김
            },
            {
              transform: [{translateY: headerTranslateY}],
            },
          ]}>
          <Animated.Image
            style={{
              width: '100%',
              height: HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT, //헤더영역을 안더해주면 및에 하단 빈 여백이 생김
              transform: [
                {
                  translateY: imageTranslateY,
                },
              ],
            }}
            source={require('./image.jpeg')}
          />
          <View style={{width: '100%', position: 'absolute', marginTop: 200}}>
            <Text>Asdfasdfasdf</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: '#62d1bc',
              height: HEADER_MIN_HEIGHT,
              opacity: headerOpacity,
              zIndex: headerOpacity,
            },
          ]}>
          <Text>뒤로가기 버튼 자리</Text>
        </Animated.View>
        <Animated.SectionList
          stickySectionHeadersEnabled={true}
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <View
              style={{
                width: '100%',
                marginTop: 10,
                height: 60,
                backgroundColor: 'red',
              }}></View>
          )}
          renderSectionHeader={({section: {title}}) =>
            title === 'Detail' ? (
              <></>
            ) : (
              title === 'Tab' && (
                <View style={{width: '100%'}}>
                  <Animated.View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      paddingLeft: 15,
                      paddingRight: 15,
                      // marginTop: (15),
                      borderBottomWidth: 2,
                      borderColor: '#F9F9F9',
                      backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}>
                      <Text style={[{color: '#333'}]}>상세정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}>
                      <Text style={[{color: '#333'}]}>전문가 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}>
                      <Text style={[{color: '#333'}]}>후기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}>
                      <Text style={[{color: '#333'}]}>Q&A</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              )
            )
          }
        />
      </SafeAreaView>
      {/* 하단 노치영역 색상 변경 */}
      <SafeAreaView style={{flex: 0, backgroundColor: '#fff', zIndex: 1}} />
    </>
  );
}
