import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getFollowersNumberByUser } from '../utils/api';
import { Dimensions } from 'react-native';

const Chart = ({ users }) => {
  const [followersData, setFollowersData] = useState([]);
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const followersPromises = users.slice(0, 10).map(async (user) => {
          const followers = await getFollowersNumberByUser(user.followers_url);
          return { name: user.login, followers: followers.length };
        });

        const followersArray = await Promise.all(followersPromises);
        setFollowersData(followersArray);
      } catch (error) {
        console.error('Error fetching followers data:', error);
      }
    };

    fetchData();
  }, [users]);

  return (
    <>
      <BarChart
        data={{
          labels: followersData.map((dataPoint) => dataPoint.name),
          datasets: [
            {
              data: followersData.map((dataPoint) => dataPoint.followers),
            },
          ],
        }}
        width={width * 2.5}
        height={300}
        fromZero
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          formatYLabel: (label) => Math.round(label), // Adjusted to round the Y-axis labels
        }}
      />
    </>
  );
};

export default Chart;
