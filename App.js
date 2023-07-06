import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const apiUrl =
      'https://jsonplaceholder.typicode.com/posts?_limit=7&_page=' + page;
    fetch(apiUrl)
      .then(res => res.json())
      .then(resJson => {
        setData(data.concat(resJson));
        setLoading(false);
      });
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
    getData();
    setLoading(true);
  };

  const listFooter = () => {
    return loading ? (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={style.container} activeOpacity={0.7}>
        <Text style={style.item}>{item.id}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{alignItems: 'center'}}>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <Text style={style.text}>FlatList with Pagination</Text>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={_renderItem}
        contentContainerStyle={{paddingBottom: 80}}
        keyExtractor={(item, index) => index}
        onEndReached={loadMoreHandler}
        onEndReachedThreshold={0.1}
        ListFooterComponent={listFooter}
      />
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 20,
    color: '#000',
  },
  container: {
    backgroundColor: '#74CFFB',
    width: 350,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 6},
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 1,
  },
  item: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
});

export default App;
