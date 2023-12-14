import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useMatchStatsQuery} from '../../../Services/API/HomeAPI';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';

const CompletedDetails = ({navigation}) => {
  const {
    params: {
      item: {
        match: {matchId},
      },
    },
  } = useRoute();

  const {
    params: {
      item: {matchStatus},
    },
  } = useRoute();

  const {isError, isLoading, isSuccess, data, error} = useMatchStatsQuery(
    matchId,
    {skip: matchStatus !== 'Completed'},
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorState error={error} />;
  }
  if (isSuccess) {
    // console.log('completed =>', data);
    return (
      <View>
        <View className="bg-black p-3">
          <View className="items-center">
            <Text className="text-black bg-white text-sm w-20 px-3 py-2 text-center rounded-full font-WorksansMedium">
              Scores
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Competition1 data={data.inningsOne} />
            <Competition2 data={data.inningsTwo} />
          </View>

          <View className="items-center mt-5 mb-2">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-600 rounded-full mr-2" />
              <Text className="text-white font-WorksansSemiBold">
                COMPLETED
              </Text>
            </View>
            <Text className="text-white font-WorksansRegular">
              {data?.status}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default CompletedDetails;

const Competition1 = ({data}) => {
  // console.log('item ==>', data)
  return (
    <View>
      <Text className="text-white font-WorksansMedium">
        {data?.batTeamName}
      </Text>
      <View className="flex-row items-center">
        <Image
          source={{uri: data?.image}}
          className="w-10 h-10 mr-3"
          resizeMode="contain"
        />
        {data?.scoreDetails?.runs && (
          <Text className="text-gray-300 font-WorksansSemiBold text-2xl">
            {data?.scoreDetails?.runs}/{data?.scoreDetails?.wickets}
          </Text>
        )}
        {data?.scoreDetails?.overs && (
          <Text className="text-gray-300 font-WorksansRegular text-base mr-2">
            ({data?.scoreDetails?.overs})
          </Text>
        )}
      </View>
    </View>
  );
};

const Competition2 = ({data}) => {
  return (
    <View>
      <Text className="text-white text-right font-WorksansMedium">
        {data?.batTeamName}
      </Text>
      <View className="flex-row items-center">
        {data?.scoreDetails?.overs && (
          <Text className="text-gray-300 font-WorksansRegular text-base mr-2">
            ({data?.scoreDetails?.overs})
          </Text>
        )}
        {data?.scoreDetails?.runs && (
          <Text className="text-gray-300 font-WorksansSemiBold text-2xl">
            {data?.scoreDetails?.runs}/{data?.scoreDetails?.wickets}
          </Text>
        )}
        <Image
          resizeMode="contain"
          source={{uri: data?.image}}
          className="w-10 h-10 ml-3"
        />
      </View>
    </View>
  );
};
