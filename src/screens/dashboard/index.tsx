import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Avatar,
  Box,
  Button,
  ListItem,
  Stack,
  Text,
} from '@react-native-material/core';
import * as RootNavigation from '@src/navigation/navigator';
import {commonStyles} from '@src/styles';
import {RootState} from '@src/app/parent';
import {Dispatch} from '@reduxjs/toolkit';
import {connect} from 'react-redux';
import {actions} from './slicer';
import {getRequestStatus, getTopStories} from './selectors';
import {TopStoriesTypes} from './types';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface MappedDispatchProps {
  fetchTopStories: ({
    categoryName,
    page,
  }: {
    categoryName: string;
    page: number;
  }) => void;
}
export interface MappedStateProps {
  topStories: TopStoriesTypes;
  requesting: boolean;
}
export type ScreenProps = MappedStateProps & MappedDispatchProps;

const DashboardScreen = (props: ScreenProps) => {
  const {fetchTopStories, topStories} = props;

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(1);

  const requestAPI = useCallback(
    (categoryName: string) => {
      fetchTopStories({categoryName, page});
    },
    [fetchTopStories, page],
  );

  useEffect(() => {
    requestAPI('world');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = () => {
    if (!topStories.isListEnd && !topStories.moreLoading) {
      setPage(page + 1);
    }
  };

  const renderScreenHeader = () => (
    <Box>
      <Text style={commonStyles.title}>Top Stories</Text>
      <Button
        onPress={() => RootNavigation.navigate('SearchScreen')}
        title="Search"
      />
    </Box>
  );
  const renderListHeader = () => (
    <Box style={{flexDirection: 'row'}}>
      <Button
        onPress={() => {
          setCategory(1);
          requestAPI('world');
        }}
        title="World"
        variant={category === 1 ? 'contained' : 'outlined'}
        style={{flex: 1}}
      />
      <Button
        onPress={() => {
          setCategory(2);
          requestAPI('science');
        }}
        title="Science"
        variant={category === 2 ? 'contained' : 'outlined'}
        style={{flex: 1}}
      />
    </Box>
  );

  const renderFooter = () => (
    <Box style={commonStyles.footerText}>
      {topStories.moreLoading && <ActivityIndicator />}
      {topStories.isListEnd && <Text>No more stories at the moment</Text>}
    </Box>
  );

  const renderEmpty = () => (
    <Box style={commonStyles.emptyText} testID="list-empty-box">
      <Text testID={'no-data-at-moment-txt'}>No Data at the moment</Text>
      <Button
        testID={'refresh-button'}
        onPress={() => requestAPI('world')}
        title="Refresh"
      />
    </Box>
  );
  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack fill center spacing={4}>
        {renderScreenHeader()}
        {topStories.loading ? (
          <Box style={commonStyles.loading}>
            <ActivityIndicator testID="loader" size="large" color="#00ff00" />
          </Box>
        ) : (
          <FlatList
            style={{width: '100%'}}
            data={topStories.data}
            renderItem={({item, index}) => (
              <ListItem
                testID={`news-item-${index}`}
                key={`${item.created_date}-${index}`}
                leadingMode="avatar"
                leading={
                  item.multimedia && item.multimedia.length > 0 ? (
                    <Avatar image={{uri: item.multimedia![0].url}} />
                  ) : (
                    <Avatar label={item.title} autoColor />
                  )
                }
                title={item.title}
                secondaryText={`${item.section}.${item.subsection}.${item.published_date}`}
                onPress={() => {
                  RootNavigation.navigate('StoryDetail', {
                    selectedIndex: index,
                  });
                }}
              />
            )}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        )}
      </Stack>
    </SafeAreaView>
  );
};
export const mapStateToProps = (state: RootState): MappedStateProps => {
  return {
    topStories: getTopStories(state),
    requesting: getRequestStatus(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => {
  return {
    fetchTopStories: ({
      categoryName,
      page,
    }: {
      categoryName: string;
      page: number;
    }) => {
      dispatch(actions.fetchTopStories({categoryName, page}));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
