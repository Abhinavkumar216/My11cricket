import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useMatchStatsQuery} from '../../../Services/API/HomeAPI';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import EmptyState from '../../../components/EmptyState';
import Icon from 'react-native-vector-icons/Ionicons';

const Scorecard = () => {
  const {
    params: {matchId, matchStatus},
  } = useRoute();

  const [expanded, setExpanded] = useState({
    cardOne: true,
    cardTwo: false,
  });
  const {isError, isLoading, isSuccess, data, error} = useMatchStatsQuery(
    matchId,
    {skip: matchStatus != 'Completed'},
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
  if (isSuccess) {
    return (
      <View className="flex-1 bg-gray-100">
        <TopScoreOne
          data={data?.inningsOne}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        {expanded.cardOne && <InningsOne data={data?.inningsOne} />}

        {/* Inning Two */}
        <TopScoreTwo
          data={data?.inningsTwo}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        {expanded.cardTwo && <InningTwo data={data?.inningsTwo} />}
      </View>
    );
  } else {
    return (
      <EmptyState
        title={'Scoreboard not created'}
        subtitle={'Visit after match end'}
      />
    );
  }
};

export default Scorecard;

const InningsOne = ({data}) => {
  return (
    <FlatList
      data={data?.battingData}
      collapsable={true}
      ListEmptyComponent={
        <EmptyState
          title={'Score not declared'}
          subtitle={'please comeback later'}
        />
      }
      ListHeaderComponent={
        <>
          <MatchHeader data={data?.battingData.length ? true : false} />
        </>
      }
      ListFooterComponent={
        <>
          <Extras data={data?.extrasDetails} />
          <BowlingData data={data?.bowlingData} />
          <FallOfWicket data={data?.fallOfWickets} />
        </>
      }
      renderItem={({item, index}) => <Playerboard item={item} index={index} />}
    />
  );
};

const InningTwo = ({data}) => {
  return (
    <FlatList
      data={data?.battingData}
      ListHeaderComponent={
        <>
          <MatchHeader data={data?.battingData.length ? true : false} />
        </>
      }
      ListFooterComponent={
        <>
          <Extras data={data?.extrasDetails} />
          <BowlingData data={data?.bowlingData} />
          <FallOfWicket data={data?.fallOfWickets} />
        </>
      }
      renderItem={({item, index}) => <Playerboard item={item} index={index} />}
    />
  );
};

const Playerboard = ({item, index}) => {
  return (
    <View
      className={`flex-row justify-evenly ${
        index % 2 == 0 ? 'bg-white' : 'bg-slate-100'
      }`}>
      <View className="flex-1 p-2">
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="font-WorksansMedium text-lg text-black">
          {item?.name}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="font-WorksansRegular text-xs text-neutral-500">
          {item?.outDesc}
        </Text>
      </View>
      <View className="flex-row flex-1 justify-center items-center">
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          {item?.runs}
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          {item?.balls}
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          {item?.fours}
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          {item?.sixes}
        </Text>
      </View>
    </View>
  );
};

const TopScoreOne = ({data, expanded, setExpanded}) => {
  const Toggle = () => {
    setExpanded({cardOne: !expanded.cardOne, cardTwo: !expanded.cardTwo});
  };

  if (data?.batTeamName) {
    return (
      <Pressable
        onPress={Toggle}
        className="flex-row items-center justify-between py-3 bg-neutral-300">
        <Text className="font-WorksansMedium text-lg px-3 text-black">
          {data?.batTeamName}
        </Text>
        <View className="flex-row items-center">
          <Text className="font-WorksansSemiBold text-xl px-3 text-black">
            <Text className="font-WorksansRegular text-sm">
              ({data?.scoreDetails?.overs})
            </Text>{' '}
            {data?.scoreDetails?.runs}/{data?.scoreDetails?.wickets}
          </Text>
          <Icon
            name={
              expanded.cardOne ? 'chevron-up-outline' : 'chevron-down-outline'
            }
            size={28}
            color={'#000'}
          />
        </View>
      </Pressable>
    );
  }
};
const TopScoreTwo = ({data, expanded, setExpanded}) => {
  const Toggle = () => {
    setExpanded({cardOne: !expanded.cardOne, cardTwo: !expanded.cardTwo});
  };

  if (data?.batTeamName) {
    return (
      <Pressable
        onPress={Toggle}
        className="flex-row items-center justify-between py-3 bg-neutral-300">
        <Text className="font-WorksansMedium text-lg px-3 text-black">
          {data?.batTeamName}
        </Text>
        <View className="flex-row items-center">
          <Text className="font-WorksansSemiBold text-xl px-3 text-black">
            <Text className="font-WorksansRegular text-sm">
              ({data?.scoreDetails?.overs})
            </Text>{' '}
            {data?.scoreDetails?.runs}/{data?.scoreDetails?.wickets}
          </Text>
          <Icon
            name={
              expanded.cardTwo ? 'chevron-up-outline' : 'chevron-down-outline'
            }
            size={28}
            color={'#000'}
          />
        </View>
      </Pressable>
    );
  }
};

const MatchHeader = ({data}) => {
  if (data) {
    return (
      <View
        className={`flex-row justify-evenly py-2 bg-white border-b mx-2 border-slate-200`}>
        <View className="flex-1 p-2">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansMedium text-base text-black">
            Batter
          </Text>
        </View>
        <View className="flex-row flex-1 justify-center items-center">
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            R
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            B
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            4s
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            6s
          </Text>
        </View>
      </View>
    );
  }
};

const Extras = ({data}) => {
  if (data?.noBalls) {
    return (
      <View className="flex-1 flex-row items-center border-gray-300 border-t">
        <View className=" p-2">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansMedium text-lg text-black">
            EXTRAS
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansRegular text-xs text-neutral-500">
            {`( nb ${data?.noBalls}, wd ${data?.wides}, b ${data?.byes}, lb ${data?.legByes}, pen ${data?.penalty} )`}
          </Text>
        </View>
        <View className=" flex-1 ml-5">
          <Text className="font-WorksansMedium text-xl text-left text-black">
            {data?.total}
          </Text>
        </View>
      </View>
    );
  }
};

const BowlingData = ({data}) => {
  if (data.length) {
    return (
      <FlatList
        data={data}
        ListHeaderComponent={<BowlingHeader />}
        renderItem={({item}) => <BowlingCard item={item} />}
      />
    );
  }
};

const BowlingHeader = () => {
  return (
    <View className={`flex-row justify-evenly bg-slate-300 py-2`}>
      <View className="flex-1 p-2">
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="font-WorksansSemiBold text-base text-black">
          Bowler
        </Text>
      </View>
      <View className="flex-row flex-1 justify-center items-center">
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          O
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          R
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          W
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          Eco
        </Text>
      </View>
    </View>
  );
};

const BowlingCard = ({item}) => {
  if (item.name) {
    return (
      <View className={`flex-row justify-evenly bg-white`}>
        <View className="flex-1 p-2">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansMedium text-lg text-black">
            {item?.name}
          </Text>
        </View>
        <View className="flex-row flex-1 justify-center items-center">
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            {item?.overs}
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            {item?.runs}
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            {item?.wickets}
          </Text>
          <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
            {item?.economy}
          </Text>
        </View>
      </View>
    );
  }
};

const FallOfWicket = ({data}) => {
  if (data.length) {
    return (
      <FlatList
        data={data}
        ListHeaderComponent={<FallOfWicketsHeader />}
        renderItem={({item}) => <FallOfWicketsCard item={item} />}
      />
    );
  }
};

const FallOfWicketsCard = ({item}) => {
  if (item.name) {
    return (
      <View className={`flex-row justify-evenly bg-white`}>
        <View className="flex-1 p-2">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansMedium text-sm text-black">
            {item?.name}
          </Text>
        </View>
        <View className="flex-row flex-1 justify-center items-center">
          <Text className="flex-1 font-WorksansMedium text-sm text-center text-black">
            {item?.wktRuns}/{item?.wktNbr}
          </Text>
          <Text className="flex-1 font-WorksansMedium text-sm text-center text-black">
            {item?.wktOver}
          </Text>
        </View>
      </View>
    );
  }
};

const FallOfWicketsHeader = () => {
  return (
    <View className={`flex-row justify-evenly bg-slate-300 py-2`}>
      <View className="flex-1 p-2">
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="font-WorksansMedium text-base text-black">
          Fall of Wicket
        </Text>
      </View>
      <View className="flex-row flex-1 justify-center items-center">
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          Score
        </Text>
        <Text className="flex-1 font-WorksansMedium text-base text-center text-black">
          Over
        </Text>
      </View>
    </View>
  );
};
