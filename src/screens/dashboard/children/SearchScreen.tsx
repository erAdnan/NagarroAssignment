import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Avatar,
  Box,
  Button,
  ListItem,
  Stack,
  Text,
  TextInput,
} from '@react-native-material/core';
import * as RootNavigation from '@src/navigation/navigator';
import {commonStyles} from '@src/styles';
import {RootState} from '@src/app/parent';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {actions} from '../slicer';
import {FlatList} from 'react-native';

const SearchScreen = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState(0);

  const searchLoading = useSelector(
    (state: RootState) => state.dashboard.requesting,
  );
  const searchedList = useSelector(
    (state: RootState) => state.dashboard.searchedList,
  );
  const recentSearches = useSelector(
    (state: RootState) => state.dashboard.recentSearches,
  );
  const dispatch = useDispatch();

  const onInputTextChange = useCallback((value: string) => {
    setQuery(value);
  }, []);
  const onSearchPress = useCallback(() => {
    query !== '' && dispatch(actions.searchArticle({query, page}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query]);

  const fetchMoreData = useCallback(() => {
    if (!searchedList.isListEnd && !searchedList.moreLoading && query !== '') {
      setPage(page + 1);
      dispatch(actions.searchArticle({query, page}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchedList.isListEnd, searchedList.moreLoading]);

  const renderFooter = () => (
    <Box style={commonStyles.footerText}>
      {searchedList.moreLoading && <ActivityIndicator />}
      {searchedList.isListEnd && <Text>No more stories at the moment</Text>}
    </Box>
  );
  const renderScreenHeader = () => (
    <Box p={10}>
      <Button
        title="←"
        style={commonStyles.backButton}
        onPress={() => {
          RootNavigation.goBack();
        }}
      />
      <Text style={commonStyles.title}>Search Here</Text>
      <Box style={commonStyles.headerBox}>
        <TextInput
          placeholder="Enter user email"
          variant="outlined"
          style={[commonStyles.input, {flex: 1}]}
          onChangeText={value => onInputTextChange(value)}
        />
        <Button
          title="Search"
          style={commonStyles.searchButton}
          onPress={onSearchPress}
        />
      </Box>
      <Text variant="h6">Last 5 recent searches:</Text>
      {recentSearches.map((search, index) => (
        <Text key={index} color={'red'} style={{borderWidth: 0.5}}>
          {search}
        </Text>
      ))}
    </Box>
  );
  const renderEmpty = () => (
    <Box style={commonStyles.emptyText}>
      <Text>No Data found</Text>
    </Box>
  );
  return (
    <SafeAreaView style={commonStyles.container}>
      {renderScreenHeader()}
      <Stack fill center spacing={4}>
        {searchLoading ? (
          <Box style={commonStyles.loading}>
            <ActivityIndicator size="large" color="#00ff00" />
          </Box>
        ) : (
          <FlatList
            // contentContainerStyle={{flexGrow: 1, flex: 1}}
            style={{width: '100%'}}
            data={searchedList.data}
            renderItem={({item, index}) => (
              <ListItem
                key={`${item.created_date}-${index}`}
                leadingMode="avatar"
                leading={
                  item.multimedia && item.multimedia.length > 0 ? (
                    <Avatar
                      image={{
                        uri: `www.nytimes.com/${item.multimedia![0].url}`,
                      }}
                    />
                  ) : (
                    <Avatar label={item.section_name} autoColor />
                  )
                }
                title={item.section_name}
                secondaryText={`${item.news_desk}.${item.print_section}.${item.created_date}`}
                onPress={() => {
                  RootNavigation.navigate('StoryDetail', {
                    selectedIndex: index,
                  });
                }}
              />
            )}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              fetchMoreData();
            }}
          />
        )}
      </Stack>
    </SafeAreaView>
  );
};

export default SearchScreen;
