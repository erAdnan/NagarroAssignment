import React from 'react';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  Stack,
  Surface,
  Text,
} from '@react-native-material/core';
import * as RootNavigation from '@src/navigation/navigator';
import {commonStyles} from '@src/styles';
import {RootState} from '@src/app/parent';
import {connect} from 'react-redux';
import {getTopStories} from '../selectors';
import {TopStoriesTypes} from '../types';
import {Error} from '../../login/types';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface MappedStateProps {
  route?: {
    params: {
      selectedIndex: number;
    };
  };
  topStories: TopStoriesTypes;
  error?: Error;
}
export type ScreenProps = MappedStateProps;

const StoryDetailScreen = (props: ScreenProps) => {
  const {topStories, route} = props;

  const seletctedItem = topStories.data[route?.params?.selectedIndex ?? 0];
  const renderScreenHeader = () => (
    <Box p={10}>
      <Button
        title="←"
        style={commonStyles.backButton}
        onPress={() => {
          RootNavigation.goBack();
        }}
      />
      <Text style={commonStyles.title}>{seletctedItem.section} Detail</Text>
    </Box>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      {renderScreenHeader()}
      <Stack fill center spacing={4}>
        <Surface
          elevation={6}
          category="large"
          style={commonStyles.surfaceWrapper}>
          <Box>
            <Text variant="h5">Section:{seletctedItem.section}</Text>
            <ListItem
              leadingMode="avatar"
              leading={
                seletctedItem.multimedia &&
                seletctedItem.multimedia.length > 0 ? (
                  <Avatar image={{uri: seletctedItem.multimedia![0].url}} />
                ) : (
                  <Avatar label={seletctedItem.title} autoColor />
                )
              }
              title={seletctedItem.title}
              secondaryText={`${seletctedItem.section}.${seletctedItem.subsection}`}
            />
            <Text variant="body1">
              Created Date:{seletctedItem.created_date}
            </Text>
            <Text variant="body1">
              Published Date:{seletctedItem.published_date}
            </Text>
            <Text variant="body1">Item type:{seletctedItem.item_type}</Text>
          </Box>
        </Surface>
      </Stack>
    </SafeAreaView>
  );
};
export const mapStateToProps = (state: RootState): MappedStateProps => {
  return {
    topStories: getTopStories(state),
  };
};
export default connect(mapStateToProps)(StoryDetailScreen);
